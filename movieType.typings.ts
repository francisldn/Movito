export interface Movie {
    id: string;
    title: string;
    thumbnail: {
        trending: {
            small: string,
            large: string,
        },
        regular: {
            small: string,
            medium: string,
            large: string,
        }
    };
    year: number;
    category: string;
    isBookmarked: boolean;
    isTrending: boolean;
    rating: string;
  }

  export interface UserType {
      id: string;
      email: string;
      myBookmark?: Movie[] | null;
  }