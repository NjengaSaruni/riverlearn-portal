/**
 * Created by saruni on 1/14/18.
 */

import {AbstractBase} from "./common.models";
import {Image} from "./uploads.models";
import {User} from "./users.models";


export class PostComment extends AbstractBase {
  text: string;
  post: Post;
  replies: PostComment[];
}

export class Post extends AbstractBase {
  text: string;
  images: Image[];
  files: File[];
  likers: User[];
  likes: number;
  comments: PostComment[];
  comment_count: number;
}


