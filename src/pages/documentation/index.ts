import { lazy } from 'react';

const documentationComponents = {
  'Why a dsl?': lazy(() => import('./WhyDsl')),
  'pine-lang': lazy(() => import('./PineLang')),
  Table: lazy(() => import('./Table')),
  Join: lazy(() => import('./Join')),
  Where: lazy(() => import('./Where')),
  Select: lazy(() => import('./Select')),
  Order: lazy(() => import('./Order')),
  Limit: lazy(() => import('./Limit')),
  From: lazy(() => import('./From')),
  Group: lazy(() => import('./Group')),
  Count: lazy(() => import('./Count')),
  Delete: lazy(() => import('./Delete')),
};

export default documentationComponents;
