export interface UserMetadata {
  avatar_url?: string;
  full_name?: string;
  [key: string]: any;
}

export interface AvatarMenuProps {
  userData?: {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
    user_metadata?: UserMetadata;
  };
}

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  avatar?: string;
  user_metadata?: UserMetadata;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
}

export interface Notification {
  id: string;
  title: string;
  body?: string;
  date?: string;
  unread?: boolean;
}

export interface NotificationProps {
  notifications?: Notification[];
  onClose?: () => void;
  className?: string;
}

export interface viewToggleProps {
  viewType: 'table' | 'grid';
  setViewType: (view: 'table' | 'grid') => void;
}

export interface IHeadingProps {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export interface BreadcrumbWithAvatarProps {
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  initialData?: string;
  initialLink?: string;
  secondaryData?: string;
  secondaryLink?: string;
  userData?: {
    name?: string;
    username?: string;
    avatar?: string;
    email?: string;
    user_metadata?: UserMetadata;
  };
}

export interface MobileSidebarProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  userDetails?: {
    name?: string;
    email?: string;
    username?: string;
    avatar?: string;
    user_metadata?: UserMetadata;
  };
  [key: string]: any;
}


