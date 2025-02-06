import useGetPost from "./useGetPost";

interface Filters {
  location: string;
  date: string[];
  categories: string[];
}

export const useGetFilteredPosts = (filters: Filters) => {
  const { posts } = useGetPost();

const filteredPosts = posts
  ? posts.filter((post) => {
      const postDate = new Date(post.date);
      const postEndDate = new Date(post.end_date);
      const filterStartDate = new Date(filters.date[0]);
      const filterEndDate = new Date(filters.date[1]);
      const address = [post.si, post.gu, post.dong].join(" ");
    // 지역, 기간, 카테고리 중 하나라도 조건에 속한 것들만 일단 걸러줌
      return (
        (address.includes(filters.location)) ||
        ((postDate >= filterStartDate) &&
        (postEndDate <= filterEndDate)) ||
        (filters.categories.some(category => post.category.includes(category)))
      );
  })
  : [];


  return filteredPosts;
};
