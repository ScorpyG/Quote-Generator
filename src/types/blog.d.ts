interface Blog {
  title: string;
  author: string;
  contents: {
    block: string;
  }[];
}

export interface BlogData extends Blog {
  _id: string;
  userId: {
    username: string;
  };
  createdAt: Date;
  updatedAt: Date;
  contents: string[];
  tags?: Array<string>;
  image?: string;
}

export interface BlogFormInput extends Blog {
  tags?: string;
  image?: FileList;
}

// The data type needs to be converted to be store in the
export interface BlogFormInputData extends Blog {
  tags?: string;
  image?: string;
}
