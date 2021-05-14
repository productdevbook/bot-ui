let loading: number;
export default (isLoading: any, countModifier: any, nuxtContext: any) => {
  loading += countModifier;
  console.log('Global loading', isLoading, loading);
};
