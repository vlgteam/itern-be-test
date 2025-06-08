import api from "../../api/axios";
import ContentEndpoint from "./homecontentEndpoint";

const homeContentApi = {
  async getallcontent(): Promise<any> {
    const response = await api.get(ContentEndpoint.getallcontent);
    return response.data.contents;
  },
  async createcontent(formData: FormData): Promise<any> {
    const response = await api.post(ContentEndpoint.createcontent, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async deletecontent(id: string): Promise<any> {
    const response = await api.delete(ContentEndpoint.deletecontent(id));
    return response.data;
  },
  async updatecontent(id: string, formData: FormData): Promise<any> {
    const response = await api.put(
      ContentEndpoint.updatecontent(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

export default homeContentApi;
