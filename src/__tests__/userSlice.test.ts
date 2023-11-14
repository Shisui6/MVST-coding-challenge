// Import necessary libraries and components
import store from "../redux/configureStore";
import {
  resetUser,
  setFilter,
  selectUser,
  selectRepos,
  fetchUser,
} from "../redux/user/user";

// Start of test suite for the user reducer
describe("user reducer", () => {
    // Test that the user reducer handles the initial state correctly
  it("should handle initial state", () => {
    // Get the current state of the user slice
    const actual = store.getState().user;
    // Expect that the user object in the state matches the initial state
    expect(actual.user).toEqual({
      name: "",
      username: "",
      profileUrl: "",
      bio: "",
      followerCount: 0,
      followingCount: 0,
    });
    // Expect that the repos array in the state is empty
    expect(actual.repos).toEqual([]);
     // Expect that the isLoading and error booleans in the state are false
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(false);
  });

  // Test that the user reducer handles the resetUser action correctly
  it("should handle resetUser", () => {
    // Dispatch the resetUser action
    store.dispatch(resetUser());
    // Get the current state of the user slice
    const actual = store.getState().user;
    // Expect that the user object in the state has been reset to the initial state
    expect(actual.user).toEqual({
      name: "",
      username: "",
      profileUrl: "",
      bio: "",
      followerCount: 0,
      followingCount: 0,
    });
  });

  // Test that the user reducer handles the setFilter action correctly
  it("should handle setFilter", () => {
    // Dispatch the setFilter action with the filter value 'test'
    store.dispatch(setFilter("test"));
    // Get the current state of the user slice
    const actual = store.getState().user;
    // Expect that the filter string in the state matches the dispatched filter value
    expect(actual.filter).toEqual("test");
  });

    // Test that the user reducer handles the selectUser selector correctly
  it("should handle selectUser", () => {
    // Use the selectUser selector to get the user object from the state
    const user = selectUser(store.getState());
    // Expect that the user object matches the initial state
    expect(user).toEqual({
      name: "",
      username: "",
      profileUrl: "",
      bio: "",
      followerCount: 0,
      followingCount: 0,
    });
  });

  // Test that the user reducer handles the selectRepos selector correctly
  it("should handle selectRepos", () => {
    // Use the selectRepos selector to get the repos array from the state
    const repos = selectRepos(store.getState());
    // Expect that the repos array is empty
    expect(repos).toEqual([]);
  });

  // Test that the user reducer handles the fetchUser pending action
  it('should handle fetchUser pending', () => {
    // Dispatch the fetchUser pending action with the payload 'test'
    store.dispatch(fetchUser.pending('user/fetchUser', 'test'));
    // Get the current state of the user slice
    const actual = store.getState().user;
    // Expect that the isLoading boolean in the state is true
    expect(actual.isLoading).toEqual(true);
  });

  // Test that the user reducer handles the fetchUser fulfilled action
  it('should handle fetchUser fulfilled', async () => {
    // Dispatch the fetchUser action with the username 'test'
    await store.dispatch(fetchUser('test'));
    // Get the current state of the user slice
    const actual = store.getState().user;
    // Expect that the user object in the state matches the dispatched user data
    expect(actual.user.username).toEqual('test');
    expect(actual.user.profileUrl).toEqual('https://avatars.githubusercontent.com/u/383316?v=4');
    expect(actual.user.bio).toEqual(null);
    expect(actual.user.followerCount).toEqual(49);
    expect(actual.user.followingCount).toEqual(0);
    // Expect that the isLoading boolean in the state is false
    expect(actual.isLoading).toEqual(false);
  });

  // Test that the user reducer handles the fetchUser rejected action
  it('should handle fetchUser rejected', async () => {
    // Dispatch the fetchUser action with the username 'admin'
    await store.dispatch(fetchUser('admin'));
    // Get the current state of the user slice
    const actual = store.getState().user;
    // Expect that the error boolean in the state is true and the isLoading boolean is false
    expect(actual.error).toEqual(true);
    expect(actual.isLoading).toEqual(false);
  });
});
  