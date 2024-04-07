import { all } from "@redux-saga/core/effects";
import {
  delete_photo_saga,
  get_photo_saga,
  post_photo_saga,
  update_photo_saga,
} from "./root/rootPhoto";

import {
  delete_video_saga,
  get_video_saga,
  post_video_saga,
  update_video_saga,
} from "./root/rootVideo";

import {
  delete_blog_saga,
  get_blog_saga,
  post_blog_saga,
  update_blog_saga,
} from "./root/rootBlog";

import {
  delete_team_saga,
  get_team_saga,
  post_team_saga,
  update_team_saga,
} from "./root/rootTeam";

import {
  delete_press_saga,
  get_press_saga,
  post_press_saga,
  update_press_saga,
} from "./root/rootPress";

import {
  delete_comment_saga,
  get_comment_saga,
  post_comment_saga,
  update_comment_saga,
} from "./root/rootComment";

import {
  delete_user_saga,
  get_user_saga,
  post_user_saga,
  update_user_saga,
} from "./root/rootUser";

import {
  delete_contact_saga,
  get_contact_saga,
  post_contact_saga,
  update_contact_saga,
} from "./root/rootContact";

import {
  delete_package_saga,
  get_package_saga,
  post_package_saga,
  update_package_saga,
} from "./root/rootPackage";

import {
  delete_order_saga,
  get_order_saga,
  post_order_saga,
  update_order_saga,
} from "./root/rootOrder";

export function* rootSaga() {
  yield all([
    // photo saga
    get_photo_saga(),
    post_photo_saga(),
    delete_photo_saga(),
    update_photo_saga(),

    // video saga
    get_video_saga(),
    post_video_saga(),
    delete_video_saga(),
    update_video_saga(),

    // blog saga
    get_blog_saga(),
    post_blog_saga(),
    delete_blog_saga(),
    update_blog_saga(),

    // team saga
    get_team_saga(),
    post_team_saga(),
    delete_team_saga(),
    update_team_saga(),

    // press saga
    get_press_saga(),
    post_press_saga(),
    delete_press_saga(),
    update_press_saga(),

    // comment saga
    get_comment_saga(),
    post_comment_saga(),
    delete_comment_saga(),
    update_comment_saga(),

    // user saga
    get_user_saga(),
    post_user_saga(),
    delete_user_saga(),
    update_user_saga(),

    //  contact saga
    get_contact_saga(),
    post_contact_saga(),
    delete_contact_saga(),
    update_contact_saga(),

   //  package saga
    get_package_saga(),
    post_package_saga(),
    delete_package_saga(),
    update_package_saga(),

    //  Order saga
    get_order_saga(),
    post_order_saga(),
    delete_order_saga(),
    update_order_saga(),
  ]);
}
