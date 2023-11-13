import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppSelector } from '../../redux/hooks';
import { selectRepos, selectUser } from "../../redux/user/user";

const User = () => {
  const user = useAppSelector(selectUser)
  const repos = useAppSelector(selectRepos)

  return (
    <section>
      <nav className="mt-10 text-center md:text-left md:mt-0 md:w-1/5 md:py-12 md:px-5 md:border-r md:fixed md:left-0 md:top-0 md:bottom-0 md:h-screen">
        <img
          src={user.profileUrl}
          alt="profile"
          className="rounded-full mb-5 w-60 h-60 md:w-50 md:h-50 my-0 mx-auto"
        />
        <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
        <h2 className="text-gray-400 mb-5">{user.username}</h2>
        <p className="text-sm mb-5">{user.bio}</p>
        <div className="flex justify-center mb-4 md:justify-normal md:mb-0">
          <p className="text-xs mr-4">
            <strong className="text-gray-700">{user.followerCount}</strong> Followers
          </p>
          <p className="text-xs">
            <strong className="text-gray-700">{user.followingCount}</strong> Following
          </p>
        </div>
        <Link to='/'>
          <button className="flex items-center justify-center md:justify-normal w-[10%] md:w-[82%] my-0 md:my-auto mx-auto rounded-lg duration-150 md:absolute md:bottom-9 text-sm p-2 text-gray-700 hover:bg-[#f8f9fa]">
            <BiLogOut className="text-gray-400 mr-3" size={25} />
            Exit
          </button>
        </Link>
      </nav>
      <main className="md:ml-[20%]">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
        <div className="mt-10 bg-white h-12 rounded-3xl border-[1.2px] border-gray-300 focus-within:border-purple-600 flex justify-between py-1 pr-1 items-center">
          <div>
            <AiOutlineSearch className="inline-block text-gray-400 ml-3 mr-3" size={22} />
            <input className=" h-full border-none outline-none"  type="text" placeholder="Search repositories" />
          </div>
          </div>
          <ul className="mt-5 divide-y space-y-3">
            {repos.map((repo) => (
              console.log(repo),
            <li className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
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
