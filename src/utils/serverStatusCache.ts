export interface ServerStatus {
  ssh?: any;
  postgres?: any;
  blogAPI?: any;
  yacht?: any;
  easyWG?: any;
  webmin?: any;
}

export const serverStatusCache: ServerStatus = {};
