import { lazy } from 'react';

const documentationComponents = {
  BasicSyntax: lazy(() => import('./BasicSyntax')),
  Count: lazy(() => import('./Count')),
  Delete: lazy(() => import('./Delete')),
  From: lazy(() => import('./From')),
  Group: lazy(() => import('./Group')),
  Introduction: lazy(() => import('./Introduction')),
  Join: lazy(() => import('./Join')),
  Limit: lazy(() => import('./Limit')),
  Order: lazy(() => import('./Order')),
  Select: lazy(() => import('./Select')),
  Table: lazy(() => import('./Table')),
  Where: lazy(() => import('./Where')),
};

export default documentationComponents;
