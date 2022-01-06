export type GetTaskResponse = {
  status: GetTaskResponseStatus;
};

export type GetTaskResponseStatus = 'notPublished' | 'published';
