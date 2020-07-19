import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};



export type Mutation = {
  __typename?: 'Mutation';
  groupCreate?: Maybe<Scalars['Boolean']>;
  groupInvite?: Maybe<Group>;
  groupKickUser?: Maybe<Scalars['Boolean']>;
  groupLeave?: Maybe<Scalars['Boolean']>;
  /** 기본 그룹으로 설정한다. 기존에 기본으로 설정되어 있던 그룹은 기본에서 해제된다(isDefault:false). */
  groupSetDefault?: Maybe<Scalars['Boolean']>;
  messageRemove: Scalars['Boolean'];
  messageRemoveImage: Scalars['Boolean'];
  /** groupId를 제공하지 않을 경우 default로 설정된 group으로 메시지가 전송된다. */
  messageShare: Message;
};


export type MutationGroupCreateArgs = {
  name: Scalars['String'];
};


export type MutationGroupInviteArgs = {
  groupId: Scalars['ID'];
  userIds: Array<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
};


export type MutationGroupKickUserArgs = {
  groupId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationGroupLeaveArgs = {
  groupId: Scalars['ID'];
};


export type MutationGroupSetDefaultArgs = {
  groupId: Scalars['ID'];
};


export type MutationMessageRemoveArgs = {
  messageId: Scalars['ID'];
};


export type MutationMessageRemoveImageArgs = {
  messageId: Scalars['ID'];
  imageId: Scalars['ID'];
};


export type MutationMessageShareArgs = {
  groupId?: Maybe<Scalars['ID']>;
  imageKeys: Array<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID'];
  name: Scalars['String'];
  creatorId: Scalars['String'];
  creatorName: Scalars['String'];
  isArchived: Scalars['Boolean'];
  members: Array<GroupMember>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type GroupMember = {
  __typename?: 'GroupMember';
  userId: Scalars['String'];
  name: Scalars['String'];
  joinedAt: Scalars['Date'];
  type?: Maybe<MemberType>;
};

export enum MemberType {
  Normal = 'normal',
  Owner = 'owner'
}

export enum GroupSortProperty {
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type Query = {
  __typename?: 'Query';
  group?: Maybe<Group>;
  groups: Array<Group>;
  message?: Maybe<Message>;
  messages: Array<Message>;
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryGroupsArgs = {
  criteria?: Maybe<GroupCriteria>;
  sortProperty?: Maybe<GroupSortProperty>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryMessageArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesArgs = {
  criteria?: Maybe<MessageCriteria>;
  sortProperty?: Maybe<MessageSortProperty>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type GroupCriteria = {
  ids?: Maybe<Array<Scalars['ID']>>;
  creatorId?: Maybe<Scalars['ID']>;
  isArchived?: Maybe<Scalars['Boolean']>;
  membersIn?: Maybe<Array<Scalars['ID']>>;
};

/** 그룹에 생성되는 메시지 단위이다. 사진들은 메시지에 1:N 관계로 내장된다. */
export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  groupId: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  isArchived: Scalars['Boolean'];
  images: Array<MessageImage>;
  userId: Scalars['ID'];
  userName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type MessageImage = {
  __typename?: 'MessageImage';
  key: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type MessageCriteria = {
  ids?: Maybe<Array<Scalars['ID']>>;
  userId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  isArchived?: Maybe<Scalars['Boolean']>;
  createdAtGte?: Maybe<Scalars['DateTime']>;
  createdAtLte?: Maybe<Scalars['DateTime']>;
  updatedAtGte?: Maybe<Scalars['DateTime']>;
  updatedAtLte?: Maybe<Scalars['DateTime']>;
};

export enum MessageSortProperty {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  GroupId = 'groupId'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Group: ResolverTypeWrapper<Group>;
  GroupMember: ResolverTypeWrapper<GroupMember>;
  MemberType: MemberType;
  GroupSortProperty: GroupSortProperty;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  GroupCriteria: GroupCriteria;
  Message: ResolverTypeWrapper<Message>;
  MessageImage: ResolverTypeWrapper<MessageImage>;
  MessageCriteria: MessageCriteria;
  MessageSortProperty: MessageSortProperty;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  ID: Scalars['ID'];
  Group: Group;
  GroupMember: GroupMember;
  Query: {};
  Int: Scalars['Int'];
  GroupCriteria: GroupCriteria;
  Message: Message;
  MessageImage: MessageImage;
  MessageCriteria: MessageCriteria;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  groupCreate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationGroupCreateArgs, 'name'>>;
  groupInvite?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<MutationGroupInviteArgs, 'groupId' | 'userIds'>>;
  groupKickUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationGroupKickUserArgs, 'groupId' | 'userId'>>;
  groupLeave?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationGroupLeaveArgs, 'groupId'>>;
  groupSetDefault?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationGroupSetDefaultArgs, 'groupId'>>;
  messageRemove?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMessageRemoveArgs, 'messageId'>>;
  messageRemoveImage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMessageRemoveImageArgs, 'messageId' | 'imageId'>>;
  messageShare?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationMessageShareArgs, 'imageKeys'>>;
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creatorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isArchived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['GroupMember']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GroupMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupMember'] = ResolversParentTypes['GroupMember']> = {
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joinedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['MemberType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  group?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGroupArgs, 'id'>>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGroupsArgs, never>>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessageArgs, 'id'>>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessagesArgs, never>>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  groupId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isArchived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['MessageImage']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MessageImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageImage'] = ResolversParentTypes['MessageImage']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  GroupMember?: GroupMemberResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageImage?: MessageImageResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
