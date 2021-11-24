import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { UserContext } from "../../../App.js";
import {
  getUser,
  follow,
  unfollow,
  isAvailable,
  updateUser,
  me as getLoggedUser,
} from "../../../services/userService";
import { useParams } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import "./ProfileHeader.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ProfileCustomize from "./ProfileCustomize/ProfileCustomize";
import Avatar from "../../../components/Avatar/Avatar";

function ProfileHeader({ postsCount }) {
  const { user: me, setUser: setMe } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [followersCount, setFollowersCount] = useState(null);
  const [customizeShown, setCustomizeShown] = useState(false);
  const [customAvatarStyle, setCustomAvatarStyle] = useState(user.customStyle);

  const { username } = useParams();

  useEffect(() => {
    async function initUser() {
      const user = await getUser(username);
      setFollowersCount(user.followers.length);
      setUser(user);
    }
    initUser();
  }, [username]);

  const isFollowing = useMemo(() => {
    return me?.following?.includes(user._id);
  }, [user, me]);

  const handleFollow = useCallback(() => {
    follow(username)
      .then(() => {
        getLoggedUser().then((loggedUser) => {
          setMe(loggedUser);
          setFollowersCount((prev) => prev + 1);
        });
      })
      .catch(() => setFollowersCount((prev) => prev - 1));
  }, [setMe, username]);
  const handleUnfollow = useCallback(() => {
    unfollow(username)
      .then(() => {
        getLoggedUser().then((loggedUser) => {
          setMe(loggedUser);
          setFollowersCount((prev) => prev - 1);
        });
      })
      .catch(() => setFollowersCount((prev) => prev + 1));
  }, [setMe, username]);

  const submitChanges = useCallback(
    async (values) => {
      const newValues = { ...values };
      delete newValues.username;
      if (!Object.keys(newValues).length) {
        return;
      }
      const formToSend = { id: user._id, customStyle: newValues };

      console.log(formToSend);
      await updateUser(formToSend);
    },
    [user._id]
  );

  return (
    <div className="ProfileHeader">
      <Formik
        initialValues={{ username: username }}
        validationSchema={yup.object().shape({
          username: yup
            .string()
            .min(3)
            .max(16) //eslint-disable-next-line
            .matches(
              /^[aA0-zZ9\s_]+\.?[aA0-zZ9\s_]+$/,
              "must only contain letters, numbers, underscores and can not begin or end with a period"
            )
            .required()
            .test(
              "availability",
              "this username is not available, please choose another one!",
              async (username) => {
                if (username === user.username) return true;
                if (!!username) return await isAvailable(username);
              }
            ),
        })}
        onSubmit={submitChanges}>
        <Form>
          <div className="image">
            <Avatar
              username={user.username}
              size="xl"
              customStyle={customAvatarStyle}
            />
            {customizeShown && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="open-customize">
                  <FontAwesomeIcon icon={faCog} />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content side="right">
                  {/* <DropdownMenu.Item> */}
                  <ProfileCustomize
                    setCustomAvatarStyle={setCustomAvatarStyle}
                  />
                  {/* </DropdownMenu.Item> */}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </div>
          <div className="settings">
            {customizeShown ? (
              <div className="customize-username">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  spellCheck={false}
                />
                <ErrorMessage
                  className="error-message"
                  name="username"
                  component="span"
                />
              </div>
            ) : (
              <h1 className="username">{username}</h1>
            )}
            <div className="button-container">
              {me.username !== username ? (
                isFollowing ? (
                  <button onClick={handleUnfollow}>Unfollow</button>
                ) : (
                  <button onClick={handleFollow}>Follow</button>
                )
              ) : customizeShown ? (
                <div>
                  <button type="submit">Save Changes</button>
                  <button onClick={() => setCustomizeShown(false)}>
                    Discard
                  </button>
                </div>
              ) : (
                <button onClick={() => setCustomizeShown(true)}>
                  Edit Profile <FontAwesomeIcon icon={faCog} />
                </button>
              )}
            </div>
          </div>

          <div className="stats">
            <ul>
              <li>
                <strong className="stat-count">{postsCount}</strong> posts
              </li>
              <li>
                <strong className="stat-count">{followersCount}</strong>{" "}
                followers
              </li>
              <li>
                <strong className="stat-count">
                  {user?.following?.length}
                </strong>{" "}
                following
              </li>
            </ul>
          </div>
          <div className="bio">
            <p>
              <span className="name">{user.username}</span> Lorem ipsum dolor
              sit amet, consectetur adipisicing 😁✌️
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ProfileHeader;
