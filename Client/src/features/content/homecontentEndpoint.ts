const ContentBase: string = "/content";

const ContentEndpoint = {
  getallcontent: `${ContentBase}`,
  createcontent: `${ContentBase}`,
  updatecontent: (id: string) => `${ContentBase}/${id}`,
  deletecontent: (id: string) => `${ContentBase}/${id}`,
};
export default ContentEndpoint;
