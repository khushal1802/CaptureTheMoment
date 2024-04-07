import { combineReducers } from "redux";
import photoReducer from "./Admin/photo/photoReducer";
import videoReducer from "./Admin/video/videoReducer";
import blogReducer from "./Admin/blog/blogReducer";
import teamReducer from "./Admin/team/teamReducer";
import pressReducer from "./Admin/press/pressReducer";
import commentReducer from "./Admin/comment/commentReducer";
import userReducer from "./Admin/user/userReducer";
import contactReducer from "./Admin/contact/contactReducer";
import packageReducer from "./Admin/package/packageReducer";
import orderReducer from "./Admin/order/orderReducer"

const rootReducer = combineReducers({
  photoReducer,
  videoReducer,
  blogReducer,
  teamReducer,
  pressReducer,
  commentReducer,
  userReducer,
  contactReducer,
  packageReducer,
  orderReducer,
});

export default rootReducer;
