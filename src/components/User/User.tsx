// Import necessary dependencies
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineSearch, AiFillGithub } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { resetUser, selectFilteredRepos, selectIsLoading, selectUser, setFilter } from "../../redux/user/user";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from "./CardSkeleton";
import { useEffect } from "react";

/**
 * User component
 * This component is responsible for rendering the user data and repo data
 * It contains a sidebar for displaying the user's data, and a main section for displaying the user's repositories
 * 
 * @returns User component
 * @param {void}
 * */
const User = () => {
  // Get user data from redux store
  const user = useAppSelector(selectUser)
  const repos = useAppSelector(selectFilteredRepos)
  const loading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Effect for redirecting to home page if user is not loaded
  useEffect(() => {
    if (user.username === '') {
      navigate('/');
    }
  });

  // Define the exit function
  // This function dispatches the resetUser action which resets user data and navigates to the home page
  const exit = () => {
    dispatch(resetUser());
    navigate('/');
  }

  return (
    <section>
      <nav className="mt-10 text-center md:text-left md:mt-0 md:w-1/5 md:py-10 md:px-5 md:border-r md:fixed md:left-0 md:top-0 md:bottom-0 md:h-screen">
        {loading ? <Skeleton circle width={200} height={200} className="mb-5"/> :<img
          src={user.profileUrl}
          alt="profile"
          className="rounded-full mb-5 w-60 h-60 md:w-[12rem] md:h-[12rem] my-0 mx-auto"
        />}
        <h1 className="text-2xl font-semibold text-gray-800">{loading ? <Skeleton /> : user.name}</h1>
        <h2 className="text-gray-400 mb-5">{loading ? <Skeleton width={90}/> : user.username}</h2>
        <p className="text-sm mb-5">{loading ? <Skeleton count={4} /> : user.bio}</p>
        <div className="flex justify-center mb-4 md:justify-normal md:mb-0">
          {loading ? <Skeleton width={50} className="mr-5"/> : <p className="text-xs mr-4">
            <strong className="text-gray-700">{user.followerCount}</strong> Followers
          </p>}
          {loading ? <Skeleton width={50} /> : <p className="text-xs">
            <strong className="text-gray-700">{user.followingCount}</strong> Following
          </p>}
        </div>
        <div className="flex justify-center gap-8 md:absolute md:bottom-4 md:w-full md:ml-5 md:left-0 md:flex-col md:gap-1">
          <a href={`https://github.com/${user.username}`} target="_blank" className="flex items-center justify-center md:justify-normal md:w-[82%] rounded-lg duration-150 text-sm py-2 px-4 md:px-2 text-gray-700 hover:bg-[#f8f9fa] cursor-pointer">
            <AiFillGithub className="text-gray-400 mr-3" size={25} />
            View on GitHub
          </a>
          <button onClick={exit} className="flex items-center justify-center md:justify-normal md:w-[82%] rounded-lg duration-150 text-sm py-2 px-4 md:px-2 text-gray-700 hover:bg-[#f8f9fa]">
            <BiLogOut className="text-gray-400 mr-3" size={25} />
            Exit
          </button>
        </div>
      </nav>
      <main className="md:ml-[20%]">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
        <div className="mt-10 bg-white h-12 rounded-3xl border-[1.2px] border-gray-300 focus-within:border-purple-600 flex justify-between py-1 pr-1 items-center">
          <div>
            <AiOutlineSearch className="inline-block text-gray-400 ml-3 mr-3" size={22} />
            <input className=" h-full border-none outline-none"  type="text" placeholder="Search repositories" onChange={(e) => { dispatch(setFilter(e.target.value)); }} />
          </div>
          </div>
          <ul className="mt-5 divide-y space-y-3">
            {loading ? 
            <>
              <CardSkeleton/>
              <CardSkeleton />
              <CardSkeleton />
            </>
            : repos.length === 0 ? 
            <div className="text-center mt-20 mb-20">
              <img src="/public/search.png" alt="search" className="mb-7 mx-auto" />
              <h1 className="text-2xl font-semibold text-gray-800">No repositories found</h1>
            </div>
            : repos.map((repo) => (
            <li key={repo.id} className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
              <a className="space-y-3">
                <div className="flex items-center gap-x-3">
                  <div>
                    <h3 className="text-base text-purple-600 font-semibold mt-1">
                      {repo.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-sm">
                  {repo.description}
                </p>
                <div className="text-sm text-gray-600 flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    {repo.language}
                  </span>
                </div>
              </a>
            </li>
            ))}
          </ul>
        </div>
      </main>
    </section>
  );
};

export default User;
