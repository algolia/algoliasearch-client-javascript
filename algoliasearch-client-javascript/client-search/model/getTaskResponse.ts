export type GetTaskResponse = {
  status: GetTaskResponse.StatusEnum;
};

export namespace GetTaskResponse {
  export enum StatusEnum {
    Published = 'published',
    NotPublished = 'notPublished',
  }
}
