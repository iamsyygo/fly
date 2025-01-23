export {}
// prettier-ignore
declare module 'vue' {
  export interface GlobalComponents {
    FlyButton: (typeof import('D:\web-design\Repositories\fly\packages\components'))['FlyButton']
    FlyAvatar: (typeof import('D:\web-design\Repositories\fly\packages\components'))['FlyAvatar']
  }
}
