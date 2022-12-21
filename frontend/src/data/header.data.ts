export interface IHeaderLink {
    id: number;
    title: string;
    path: string;
}

export const headerLinks:IHeaderLink[] = [
    { id: 0, title: 'Home', path: '/' },
    { id: 1, title: 'Products', path: '/products' },
    // { id: 1, title: 'Auth', path: '/auth' },
    // { id: 2, title: 'Registry', path: '/registry' },
    // { id: 3, title: 'Profile', path: '/profile' },
];