export {}
// prettier-ignore
declare module 'vue' {
  export interface GlobalComponents {
    SparkButton: (typeof import('/Volumes/Data/WebDesign/Repository/spark/packages/components'))['SparkButton']
    SparkAvatar: (typeof import('/Volumes/Data/WebDesign/Repository/spark/packages/components'))['SparkAvatar']
  }
}
