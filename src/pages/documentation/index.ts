import { lazy } from 'react';

const documentationComponents = {
  'Why a PSL?': lazy(() => import('./WhyDsl')),
  'Intro': lazy(() => import('./PineLang')),
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
  Variables: lazy(() => import('./Variables')),
};

export default documentationComponents;
