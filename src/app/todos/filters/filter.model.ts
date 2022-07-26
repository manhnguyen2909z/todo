export enum VISIBILITY_FILTER {
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW_ACTIVE = 'SHOW_ACTIVE',
    SHOW_ALL = 'SHOW_ALL'
  }
  
  export type TodoFilter = {
    label: string;
    value: VISIBILITY_FILTER;
    isActive: boolean,
  };
  
  export const initialFilters: TodoFilter[] = [
    { label: 'All', value: VISIBILITY_FILTER.SHOW_ALL ,isActive: true,},
    { label: 'Active', value: VISIBILITY_FILTER.SHOW_ACTIVE ,isActive: false,},
    { label: 'Completed', value: VISIBILITY_FILTER.SHOW_COMPLETED ,isActive: false,}
  ];