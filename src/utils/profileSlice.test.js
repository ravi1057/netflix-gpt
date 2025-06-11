import profileReducer, { setSelectedProfile, setProfiles, clearSelectedProfile } from './profileSlice';

describe('profileSlice', () => {
  const initialState = {
    currentProfile: null,
    profiles: [],
  };

  it('should return the initial state', () => {
    expect(profileReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setSelectedProfile', () => {
    const profile = { id: '1', name: 'Test Profile' };
    const previousState = { ...initialState };
    expect(profileReducer(previousState, setSelectedProfile(profile))).toEqual({
      ...initialState,
      currentProfile: profile,
    });
  });

  it('should handle setProfiles', () => {
    const profiles = [{ id: '1', name: 'Profile 1' }, { id: '2', name: 'Profile 2' }];
    const previousState = { ...initialState };
    expect(profileReducer(previousState, setProfiles(profiles))).toEqual({
      ...initialState,
      profiles: profiles,
    });
  });

  it('should handle clearSelectedProfile', () => {
    const previousState = {
      ...initialState,
      currentProfile: { id: '1', name: 'Test Profile' }
    };
    expect(profileReducer(previousState, clearSelectedProfile())).toEqual({
      ...initialState,
      currentProfile: null,
    });
  });

  it('should handle clearSelectedProfile when currentProfile is already null', () => {
    const previousState = { ...initialState };
    expect(profileReducer(previousState, clearSelectedProfile())).toEqual({
      ...initialState,
      currentProfile: null,
    });
  });

  it('should correctly update profiles when currentProfile is set', () => {
    const previousState = {
        currentProfile: { id: '1', name: 'Current Profile' },
        profiles: [{ id: '1', name: 'Current Profile' }]
    };
    const newProfiles = [{ id: '2', name: 'New Profile 1' }, { id: '3', name: 'New Profile 2' }];
    expect(profileReducer(previousState, setProfiles(newProfiles))).toEqual({
        ...previousState,
        profiles: newProfiles,
    });
  });

  it('should correctly update currentProfile when profiles are already set', () => {
    const previousState = {
        currentProfile: null,
        profiles: [{ id: '1', name: 'Profile 1' }, { id: '2', name: 'Profile 2' }]
    };
    const newCurrentProfile = { id: '1', name: 'Profile 1' };
    expect(profileReducer(previousState, setSelectedProfile(newCurrentProfile))).toEqual({
        ...previousState,
        currentProfile: newCurrentProfile,
    });
  });

});
