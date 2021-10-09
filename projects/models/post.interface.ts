import {Category} from "projects/models/category.interface";
import {User} from "projects/models/user.interface";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdOn: Date;
  modifiedOn: Date;
  slug: string;
  category: Category;
  user: User;
  status?: string;
  mainImageUrl?: string;
}
