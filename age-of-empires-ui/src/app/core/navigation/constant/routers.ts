import { Router } from '../model/router.model';
import * as uuid from 'uuid';

export const ROUTER: Router[] = [
  {
    id: uuid.v4(),
    name: 'Home',
    link: 'home',
    title: 'Home Page',
    visible: true,
  },
  {
    id: uuid.v4(),
    name: 'Units',
    link: 'unit',
    title: 'Units Page',
    visible: true,
  },
  {
    id: uuid.v4(),
    name: 'Units',
    link: 'unit/list',
    title: 'Units Page',
    visible: false,
  },
  {
    id: uuid.v4(),
    name: 'Detail',
    link: 'unit/detail',
    title: 'Unit Detail Page',
    visible: false,
  },
];
