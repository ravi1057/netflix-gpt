import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ManageProfiles from './ManageProfiles';
import * as firebaseUtils from '../../utils/firebase'; // Import all as an object

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock Firebase utility functions
jest.mock('../../utils/firebase', () => ({
  getProfilesForUser: jest.fn(),
  addProfile: jest.fn(),
  updateProfile: jest.fn(),
  deleteProfile: jest.fn(),
}));

// Mock window.confirm
global.confirm = jest.fn(() => true); // Default to true (user confirms)

const mockStore = configureStore([]);

describe('ManageProfiles', () => {
  let store;
  const mockUser = { uid: 'testUser123', email: 'test@example.com' };
  const mockProfilesData = [
    { id: 'p1', name: 'Main Profile', avatar: null, userId: mockUser.uid },
    { id: 'p2', name: 'Kids Zone', avatar: null, userId: mockUser.uid },
  ];

  beforeEach(() => {
    store = mockStore({
      user: mockUser,
      profile: {
        profiles: mockProfilesData, // Initial profiles in store
        currentProfile: null,
      },
    });
    store.dispatch = jest.fn();
    mockNavigate.mockClear();
    firebaseUtils.getProfilesForUser.mockResolvedValue(mockProfilesData); // Default mock
    firebaseUtils.addProfile.mockResolvedValue({ id: 'p3', name: 'New Profile', avatar: null, userId: mockUser.uid });
    firebaseUtils.updateProfile.mockResolvedValue({});
    firebaseUtils.deleteProfile.mockResolvedValue({});
    global.confirm.mockClear().mockReturnValue(true);
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ManageProfiles />
        </BrowserRouter>
      </Provider>
    );

  it('renders "Add a New Profile" heading initially', () => {
    renderComponent();
    expect(screen.getByText('Add a New Profile')).toBeInTheDocument();
  });

  it('renders existing profiles from the store/firebase mock', async () => {
    renderComponent();
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledWith(mockUser.uid));
    expect(screen.getByText('Main Profile')).toBeInTheDocument();
    expect(screen.getByText('Kids Zone')).toBeInTheDocument();
  });

  it('allows adding a new profile', async () => {
    renderComponent();
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(1)); // Initial fetch

    const input = screen.getByPlaceholderText('Profile Name');
    const addButton = screen.getByText('Add Profile');

    fireEvent.change(input, { target: { value: 'New Profile' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(firebaseUtils.addProfile).toHaveBeenCalledWith(mockUser.uid, { name: 'New Profile', avatar: null }));
    // Expect profiles to be re-fetched
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(2));
    expect(input.value).toBe(''); // Input should be cleared
  });

  it('allows editing a profile', async () => {
    renderComponent();
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(1));

    // Find an Edit button - let's assume for 'Main Profile'
    // Buttons are generic "Edit", need to be more specific or use getAllByText
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]); // Click Edit for the first profile ('Main Profile')

    await waitFor(() => {
        expect(screen.getByDisplayValue('Main Profile')).toBeInTheDocument();
        expect(screen.getByText('Edit Profile')).toBeInTheDocument(); // Heading changes
    });

    const input = screen.getByPlaceholderText('Profile Name');
    fireEvent.change(input, { target: { value: 'Main Profile Updated' } });

    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    await waitFor(() => expect(firebaseUtils.updateProfile).toHaveBeenCalledWith('p1', { name: 'Main Profile Updated' }));
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(2)); // Re-fetch
    expect(input.value).toBe(''); // Input cleared after successful update
    expect(screen.getByText('Add a New Profile')).toBeInTheDocument(); // Heading resets
  });

  it('allows cancelling an edit', async () => {
    renderComponent();
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(1));

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]); // Click Edit for 'Main Profile'

    await waitFor(() => {
        expect(screen.getByDisplayValue('Main Profile')).toBeInTheDocument();
    });

    const cancelButton = screen.getByText('Cancel Edit');
    fireEvent.click(cancelButton);

    expect(screen.getByPlaceholderText('Profile Name').value).toBe('');
    expect(screen.getByText('Add a New Profile')).toBeInTheDocument(); // Heading resets
  });


  it('allows deleting a profile', async () => {
    renderComponent();
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(1));

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]); // Click Delete for 'Main Profile'

    expect(global.confirm).toHaveBeenCalledWith("Are you sure you want to delete this profile? This action cannot be undone.");

    await waitFor(() => expect(firebaseUtils.deleteProfile).toHaveBeenCalledWith('p1'));
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(2)); // Re-fetch
  });

  it('does not delete if user cancels confirmation', async () => {
    global.confirm.mockReturnValueOnce(false); // User clicks "Cancel"
    renderComponent();
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(1));

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(global.confirm).toHaveBeenCalledTimes(1);
    expect(firebaseUtils.deleteProfile).not.toHaveBeenCalled();
    expect(firebaseUtils.getProfilesForUser).toHaveBeenCalledTimes(1); // No re-fetch
  });

  it('navigates to /profiles/select when "Done" is clicked', async () => {
    renderComponent();
    await waitFor(() => expect(firebaseUtils.getProfilesForUser).toHaveBeenCalled()); // Wait for initial load

    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);
    expect(mockNavigate).toHaveBeenCalledWith('/profiles/select');
  });

});
