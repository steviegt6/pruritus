/// <reference types="node" />
/// <reference types="react" />
declare module "common/env" {
    const _default: {
        isCanary: boolean;
        channel: string;
        appName: string;
        integrationTests: boolean;
        unitTests: boolean;
        development: boolean;
        production: boolean;
    };
    export default _default;
}
declare module "common/butlerd/messages" {
    export type RFCDate = string;
    /**
     * undocumented
     */
    export interface LaunchTarget {
        /**
         * The manifest action corresponding to this launch target.
         * For implicit launch targets, a minimal one will be generated.
         */
        action: Action;
        /** Host this launch target was found for */
        host: Host;
        /** Detailed launch strategy */
        strategy: StrategyResult;
    }
    /**
     */
    export interface StrategyResult {
        /** Name of launch strategy used for launch target */
        strategy: LaunchStrategy;
        /** Absolute filesystem path of the target. */
        fullTargetPath: string;
        /** If a local file, result of dash configure */
        candidate: Candidate;
    }
    /**
     * undocumented
     */
    export enum LaunchStrategy {
        Unknown = "",
        Native = "native",
        HTML = "html",
        URL = "url",
        Shell = "shell"
    }
    /**
     * Result for Meta.Authenticate
     */
    export interface MetaAuthenticateResult {
        /** undocumented */
        ok: boolean;
    }
    /**
     * When using TCP transport, must be the first message sent
     */
    export const MetaAuthenticate: import("butlerd/lib/support").RequestCreator<MetaAuthenticateParams, MetaAuthenticateResult>;
    /**
     * Result for Meta.Flow
     */
    export interface MetaFlowResult {
    }
    /**
     * When called, defines the entire duration of the daemon's life.
     *
     * Cancelling that conversation (or closing the TCP connection) will
     * shut down the daemon after all other requests have finished. This
     * allows gracefully switching to another daemon.
     *
     * This conversation is also used to send all global notifications,
     * regarding data that's fetched, network state, etc.
     *
     * Note that this call never returns - you have to cancel it when you're
     * done with the daemon.
     */
    export const MetaFlow: import("butlerd/lib/support").RequestCreator<MetaFlowParams, MetaFlowResult>;
    /**
     * Result for Meta.Shutdown
     */
    export interface MetaShutdownResult {
    }
    /**
     * When called, gracefully shutdown the butler daemon.
     */
    export const MetaShutdown: import("butlerd/lib/support").RequestCreator<MetaShutdownParams, MetaShutdownResult>;
    /**
     * Result for Version.Get
     */
    export interface VersionGetResult {
        /** Something short, like `v8.0.0` */
        version: string;
        /** Something long, like `v8.0.0, built on Aug 27 2017 @ 01:13:55, ref d833cc0aeea81c236c81dffb27bc18b2b8d8b290` */
        versionString: string;
    }
    /**
     * Retrieves the version of the butler instance the client
     * is connected to.
     *
     * This endpoint is meant to gather information when reporting
     * issues, rather than feature sniffing. Conforming clients should
     * automatically download new versions of butler, see the **Updating** section.
     */
    export const VersionGet: import("butlerd/lib/support").RequestCreator<VersionGetParams, VersionGetResult>;
    /**
     * Result for Network.SetSimulateOffline
     */
    export interface NetworkSetSimulateOfflineResult {
    }
    /**
     * undocumented
     */
    export const NetworkSetSimulateOffline: import("butlerd/lib/support").RequestCreator<NetworkSetSimulateOfflineParams, NetworkSetSimulateOfflineResult>;
    /**
     * Result for Network.SetBandwidthThrottle
     */
    export interface NetworkSetBandwidthThrottleResult {
    }
    /**
     * undocumented
     */
    export const NetworkSetBandwidthThrottle: import("butlerd/lib/support").RequestCreator<NetworkSetBandwidthThrottleParams, NetworkSetBandwidthThrottleResult>;
    /**
     * Result for Profile.List
     */
    export interface ProfileListResult {
        /** A list of remembered profiles */
        profiles: Profile[];
    }
    /**
     * Lists remembered profiles
     */
    export const ProfileList: import("butlerd/lib/support").RequestCreator<ProfileListParams, ProfileListResult>;
    /**
     * Represents a user for which we have profile information,
     * ie. that we can connect as, etc.
     */
    export interface Profile {
        /** itch.io user ID, doubling as profile ID */
        id: number;
        /** Timestamp the user last connected at (to the client) */
        lastConnected: RFCDate;
        /** User information */
        user: User;
    }
    /**
     * Result for Profile.LoginWithPassword
     */
    export interface ProfileLoginWithPasswordResult {
        /** Information for the new profile, now remembered */
        profile: Profile;
        /** Profile cookie for website */
        cookie: {
            [key: string]: string;
        };
    }
    /**
     * Add a new profile by password login
     */
    export const ProfileLoginWithPassword: import("butlerd/lib/support").RequestCreator<ProfileLoginWithPasswordParams, ProfileLoginWithPasswordResult>;
    /**
     * Result for Profile.LoginWithAPIKey
     */
    export interface ProfileLoginWithAPIKeyResult {
        /** Information for the new profile, now remembered */
        profile: Profile;
    }
    /**
     * Add a new profile by API key login. This can be used
     * for integration tests, for example. Note that no cookies
     * are returned for this kind of login.
     */
    export const ProfileLoginWithAPIKey: import("butlerd/lib/support").RequestCreator<ProfileLoginWithAPIKeyParams, ProfileLoginWithAPIKeyResult>;
    /**
     * Result for Profile.RequestCaptcha
     */
    export interface ProfileRequestCaptchaResult {
        /** The response given by recaptcha after it's been filled */
        recaptchaResponse: string;
    }
    /**
     * Ask the user to solve a captcha challenge
     * Sent during @@ProfileLoginWithPasswordParams if certain
     * conditions are met.
     */
    export const ProfileRequestCaptcha: import("butlerd/lib/support").RequestCreator<ProfileRequestCaptchaParams, ProfileRequestCaptchaResult>;
    /**
     * Result for Profile.RequestTOTP
     */
    export interface ProfileRequestTOTPResult {
        /** The TOTP code entered by the user */
        code: string;
    }
    /**
     * Ask the user to provide a TOTP token.
     * Sent during @@ProfileLoginWithPasswordParams if the user has
     * two-factor authentication enabled.
     */
    export const ProfileRequestTOTP: import("butlerd/lib/support").RequestCreator<ProfileRequestTOTPParams, ProfileRequestTOTPResult>;
    /**
     * Result for Profile.UseSavedLogin
     */
    export interface ProfileUseSavedLoginResult {
        /** Information for the now validated profile */
        profile: Profile;
    }
    /**
     * Use saved login credentials to validate a profile.
     */
    export const ProfileUseSavedLogin: import("butlerd/lib/support").RequestCreator<ProfileUseSavedLoginParams, ProfileUseSavedLoginResult>;
    /**
     * Result for Profile.Forget
     */
    export interface ProfileForgetResult {
        /** True if the profile did exist (and was successfully forgotten) */
        success: boolean;
    }
    /**
     * Forgets a remembered profile - it won't appear in the
     * @@ProfileListParams results anymore.
     */
    export const ProfileForget: import("butlerd/lib/support").RequestCreator<ProfileForgetParams, ProfileForgetResult>;
    /**
     * Result for Profile.Data.Put
     */
    export interface ProfileDataPutResult {
    }
    /**
     * Stores some data associated to a profile, by key.
     */
    export const ProfileDataPut: import("butlerd/lib/support").RequestCreator<ProfileDataPutParams, ProfileDataPutResult>;
    /**
     * Result for Profile.Data.Get
     */
    export interface ProfileDataGetResult {
        /** True if the value existed */
        ok: boolean;
        /** undocumented */
        value: string;
    }
    /**
     * Retrieves some data associated to a profile, by key.
     */
    export const ProfileDataGet: import("butlerd/lib/support").RequestCreator<ProfileDataGetParams, ProfileDataGetResult>;
    /**
     * Result for Search.Games
     */
    export interface SearchGamesResult {
        /** undocumented */
        games: Game[];
    }
    /**
     * Searches for games.
     */
    export const SearchGames: import("butlerd/lib/support").RequestCreator<SearchGamesParams, SearchGamesResult>;
    /**
     * Result for Search.Users
     */
    export interface SearchUsersResult {
        /** undocumented */
        users: User[];
    }
    /**
     * Searches for users.
     */
    export const SearchUsers: import("butlerd/lib/support").RequestCreator<SearchUsersParams, SearchUsersResult>;
    /**
     * Result for Fetch.Game
     */
    export interface FetchGameResult {
        /** Game info */
        game: Game;
        /** Marks that a request should be issued afterwards with 'Fresh' set */
        stale?: boolean;
    }
    /**
     * Fetches information for an itch.io game.
     */
    export const FetchGame: import("butlerd/lib/support").RequestCreator<FetchGameParams, FetchGameResult>;
    /**
     * undocumented
     */
    export interface GameRecord {
        /** Game ID */
        id: number;
        /** Game title */
        title: string;
        /** Game cover */
        cover: string;
        /** True if owned */
        owned: boolean;
        /** Non-nil if installed (has caves) */
        installedAt: RFCDate;
    }
    /**
     * undocumented
     */
    export enum GameRecordsSource {
        Owned = "owned",
        Installed = "installed",
        Profile = "profile",
        Collection = "collection"
    }
    /**
     * undocumented
     */
    export interface GameRecordsFilters {
        /** undocumented */
        classification?: GameClassification;
        /** undocumented */
        installed?: boolean;
        /** undocumented */
        owned?: boolean;
    }
    /**
     * Result for Fetch.GameRecords
     */
    export interface FetchGameRecordsResult {
        /** All the records that were fetched */
        records: GameRecord[];
        /** Marks that a request should be issued afterwards with 'Fresh' set */
        stale?: boolean;
    }
    /**
     * Fetches game records - owned, installed, in collection,
     * with search, etc. Includes download key info, cave info, etc.
     */
    export const FetchGameRecords: import("butlerd/lib/support").RequestCreator<FetchGameRecordsParams, FetchGameRecordsResult>;
    /**
     * Result for Fetch.DownloadKey
     */
    export interface FetchDownloadKeyResult {
        /** undocumented */
        downloadKey: DownloadKey;
        /** Marks that a request should be issued afterwards with 'Fresh' set */
        stale?: boolean;
    }
    /**
     * Fetches a download key
     */
    export const FetchDownloadKey: import("butlerd/lib/support").RequestCreator<FetchDownloadKeyParams, FetchDownloadKeyResult>;
    /**
     * undocumented
     */
    export interface FetchDownloadKeysFilter {
        /** Return only download keys for given game */
        gameId?: number;
    }
    /**
     * Result for Fetch.DownloadKeys
     */
    export interface FetchDownloadKeysResult {
        /** All the download keys found in the local DB. */
        items: DownloadKey[];
        /**
         * Whether the information was fetched from a stale cache,
         * and could warrant a refresh if online.
         */
        stale: boolean;
    }
    /**
     * Fetches multiple download keys
     */
    export const FetchDownloadKeys: import("butlerd/lib/support").RequestCreator<FetchDownloadKeysParams, FetchDownloadKeysResult>;
    /**
     * Result for Fetch.GameUploads
     */
    export interface FetchGameUploadsResult {
        /** List of uploads */
        uploads: Upload[];
        /**
         * Marks that a request should be issued
         * afterwards with 'Fresh' set
         */
        stale?: boolean;
    }
    /**
     * Fetches uploads for an itch.io game
     */
    export const FetchGameUploads: import("butlerd/lib/support").RequestCreator<FetchGameUploadsParams, FetchGameUploadsResult>;
    /**
     * Result for Fetch.User
     */
    export interface FetchUserResult {
        /** User info */
        user: User;
        /**
         * Marks that a request should be issued
         * afterwards with 'Fresh' set
         */
        stale?: boolean;
    }
    /**
     * Fetches information for an itch.io user.
     */
    export const FetchUser: import("butlerd/lib/support").RequestCreator<FetchUserParams, FetchUserResult>;
    /**
     * Result for Fetch.Sale
     */
    export interface FetchSaleResult {
        /** undocumented */
        sale?: Sale;
    }
    /**
     * Fetches the best current *locally cached* sale for a given
     * game.
     */
    export const FetchSale: import("butlerd/lib/support").RequestCreator<FetchSaleParams, FetchSaleResult>;
    /**
     * Result for Fetch.Collection
     */
    export interface FetchCollectionResult {
        /** Collection info */
        collection: Collection;
        /**
         * True if the info was from local DB and
         * it should be re-queried using "Fresh"
         */
        stale?: boolean;
    }
    /**
     * Fetch a collection's title, gamesCount, etc.
     * but not its games.
     */
    export const FetchCollection: import("butlerd/lib/support").RequestCreator<FetchCollectionParams, FetchCollectionResult>;
    /**
     * undocumented
     */
    export interface CollectionGamesFilters {
        /** undocumented */
        installed: boolean;
        /** undocumented */
        classification: GameClassification;
    }
    /**
     * Result for Fetch.Collection.Games
     */
    export interface FetchCollectionGamesResult {
        /** Requested games for this collection */
        items: CollectionGame[];
        /** Use to fetch the next 'page' of results */
        nextCursor?: Cursor;
        /** If true, re-issue request with 'Fresh' */
        stale?: boolean;
    }
    /**
     * Fetches information about a collection and the games it
     * contains.
     */
    export const FetchCollectionGames: import("butlerd/lib/support").RequestCreator<FetchCollectionGamesParams, FetchCollectionGamesResult>;
    /**
     * Result for Fetch.ProfileCollections
     */
    export interface FetchProfileCollectionsResult {
        /** Collections belonging to the profile */
        items: Collection[];
        /** Used to fetch the next page */
        nextCursor?: Cursor;
        /** If true, re-issue request with "Fresh" */
        stale?: boolean;
    }
    /**
     * Lists collections for a profile. Does not contain
     * games.
     */
    export const FetchProfileCollections: import("butlerd/lib/support").RequestCreator<FetchProfileCollectionsParams, FetchProfileCollectionsResult>;
    /**
     * undocumented
     */
    export interface ProfileGameFilters {
        /** undocumented */
        visibility: string;
        /** undocumented */
        paidStatus: string;
    }
    /**
     * undocumented
     */
    export interface ProfileGame {
        /** undocumented */
        game: Game;
        /** undocumented */
        viewsCount: number;
        /** undocumented */
        downloadsCount: number;
        /** undocumented */
        purchasesCount: number;
        /** undocumented */
        published: boolean;
    }
    /**
     * Result for Fetch.ProfileGames
     */
    export interface FetchProfileGamesResult {
        /** Profile games */
        items: ProfileGame[];
        /** Used to fetch the next page */
        nextCursor?: Cursor;
        /** If true, re-issue request with "Fresh" */
        stale?: boolean;
    }
    /**
     * undocumented
     */
    export const FetchProfileGames: import("butlerd/lib/support").RequestCreator<FetchProfileGamesParams, FetchProfileGamesResult>;
    /**
     * undocumented
     */
    export interface ProfileOwnedKeysFilters {
        /** undocumented */
        installed: boolean;
        /** undocumented */
        classification: GameClassification;
    }
    /**
     * Result for Fetch.ProfileOwnedKeys
     */
    export interface FetchProfileOwnedKeysResult {
        /** Download keys fetched for profile */
        items: DownloadKey[];
        /** Used to fetch the next page */
        nextCursor?: Cursor;
        /** If true, re-issue request with "Fresh" */
        stale?: boolean;
    }
    /**
     * undocumented
     */
    export const FetchProfileOwnedKeys: import("butlerd/lib/support").RequestCreator<FetchProfileOwnedKeysParams, FetchProfileOwnedKeysResult>;
    /**
     * Result for Fetch.Commons
     */
    export interface FetchCommonsResult {
        /** undocumented */
        downloadKeys: DownloadKeySummary[];
        /** undocumented */
        caves: CaveSummary[];
        /** undocumented */
        installLocations: InstallLocationSummary[];
    }
    /**
     * undocumented
     */
    export const FetchCommons: import("butlerd/lib/support").RequestCreator<FetchCommonsParams, FetchCommonsResult>;
    /**
     * undocumented
     */
    export interface DownloadKeySummary {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** Identifier of the game to which this download key grants access */
        gameId: number;
        /** Date this key was created at (often coincides with purchase time) */
        createdAt: RFCDate;
    }
    /**
     * undocumented
     */
    export interface CaveSummary {
        /** undocumented */
        id: string;
        /** undocumented */
        gameId: number;
        /** undocumented */
        lastTouchedAt: RFCDate;
        /** undocumented */
        secondsRun: number;
        /** undocumented */
        installedSize: number;
    }
    /**
     * A Cave corresponds to an "installed item" for a game.
     *
     * It maps one-to-one with an upload. There might be 0, 1, or several
     * caves for a given game. Multiple caves for a single game is a rare-ish
     * case (single-page bundles, bonus content) but one that should be handled.
     */
    export interface Cave {
        /** Unique identifier of this cave (UUID) */
        id: string;
        /** Game that's installed in this cave */
        game: Game;
        /** Upload that's installed in this cave */
        upload: Upload;
        /** Build that's installed in this cave, if the upload is wharf-powered */
        build?: Build;
        /** Stats about cave usage and first install */
        stats: CaveStats;
        /** Information about where the cave is installed, how much space it takes up etc. */
        installInfo: CaveInstallInfo;
    }
    /**
     * CaveStats contains stats about cave usage and first install
     */
    export interface CaveStats {
        /** Time the cave was first installed */
        installedAt: RFCDate;
        /** undocumented */
        lastTouchedAt: RFCDate;
        /** undocumented */
        secondsRun: number;
    }
    /**
     * CaveInstallInfo contains information about where the cave is installed, how
     * much space it takes up, etc.
     */
    export interface CaveInstallInfo {
        /**
         * Size the cave takes up - or at least, size it took up when we finished
         * installing it. Does not include files generated by the game in the install folder.
         */
        installedSize: number;
        /**
         * Name of the install location for this cave. This may change if the cave
         * is moved.
         */
        installLocation: string;
        /** Absolute path to the install folder */
        installFolder: string;
        /** If true, this cave is ignored while checking for updates */
        pinned: boolean;
    }
    /**
     * undocumented
     */
    export interface InstallLocationSummary {
        /** Unique identifier for this install location */
        id: string;
        /** Absolute path on disk for this install location */
        path: string;
        /** Information about the size used and available at this install location */
        sizeInfo: InstallLocationSizeInfo;
    }
    /**
     * undocumented
     */
    export interface InstallLocationSizeInfo {
        /** Number of bytes used by caves installed in this location */
        installedSize: number;
        /**
         * Free space at this location (depends on the partition/disk on which
         * it is), or a negative value if we can't find it
         */
        freeSize: number;
        /**
         * Total space of this location (depends on the partition/disk on which
         * it is), or a negative value if we can't find it
         */
        totalSize: number;
    }
    /**
     * undocumented
     */
    export interface CavesFilters {
        /** undocumented */
        classification?: GameClassification;
        /** undocumented */
        gameId?: number;
        /** undocumented */
        installLocationId?: string;
    }
    /**
     * Result for Fetch.Caves
     */
    export interface FetchCavesResult {
        /** undocumented */
        items: Cave[];
        /** Use to fetch the next 'page' of results */
        nextCursor?: Cursor;
    }
    /**
     * Retrieve info for all caves.
     */
    export const FetchCaves: import("butlerd/lib/support").RequestCreator<FetchCavesParams, FetchCavesResult>;
    /**
     * Result for Fetch.Cave
     */
    export interface FetchCaveResult {
        /** undocumented */
        cave: Cave;
    }
    /**
     * Retrieve info on a cave by ID.
     */
    export const FetchCave: import("butlerd/lib/support").RequestCreator<FetchCaveParams, FetchCaveResult>;
    /**
     * Result for Fetch.ExpireAll
     */
    export interface FetchExpireAllResult {
    }
    /**
     * Mark all local data as stale.
     */
    export const FetchExpireAll: import("butlerd/lib/support").RequestCreator<FetchExpireAllParams, FetchExpireAllResult>;
    /**
     * Result for Game.FindUploads
     */
    export interface GameFindUploadsResult {
        /** A list of uploads that were found to be compatible. */
        uploads: Upload[];
    }
    /**
     * Finds uploads compatible with the current runtime, for a given game.
     */
    export const GameFindUploads: import("butlerd/lib/support").RequestCreator<GameFindUploadsParams, GameFindUploadsResult>;
    /**
     * Result for Install.Queue
     */
    export interface InstallQueueResult {
        /** undocumented */
        id: string;
        /** undocumented */
        reason: DownloadReason;
        /** undocumented */
        caveId: string;
        /** undocumented */
        game: Game;
        /** undocumented */
        upload: Upload;
        /** undocumented */
        build: Build;
        /** undocumented */
        installFolder: string;
        /** undocumented */
        stagingFolder: string;
        /** undocumented */
        installLocationId: string;
    }
    /**
     * Queues an install operation to be later performed
     * via @@InstallPerformParams.
     */
    export const InstallQueue: import("butlerd/lib/support").RequestCreator<InstallQueueParams, InstallQueueResult>;
    /**
     * Result for Install.Plan
     */
    export interface InstallPlanResult {
        /** undocumented */
        game: Game;
        /** undocumented */
        uploads: Upload[];
        /** undocumented */
        info: InstallPlanInfo;
    }
    /**
     * For modal-first install
     */
    export const InstallPlan: import("butlerd/lib/support").RequestCreator<InstallPlanParams, InstallPlanResult>;
    /**
     * undocumented
     */
    export interface InstallPlanInfo {
        /** undocumented */
        upload: Upload;
        /** undocumented */
        build: Build;
        /** undocumented */
        type: string;
        /** undocumented */
        diskUsage: DiskUsageInfo;
        /** undocumented */
        error: string;
        /** undocumented */
        errorMessage: string;
        /** undocumented */
        errorCode: number;
    }
    /**
     * undocumented
     */
    export interface DiskUsageInfo {
        /** undocumented */
        finalDiskUsage: number;
        /** undocumented */
        neededFreeSpace: number;
        /** undocumented */
        accuracy: string;
    }
    /**
     * Result for Caves.SetPinned
     */
    export interface CavesSetPinnedResult {
    }
    /**
     * undocumented
     */
    export const CavesSetPinned: import("butlerd/lib/support").RequestCreator<CavesSetPinnedParams, CavesSetPinnedResult>;
    /**
     * Result for Install.CreateShortcut
     */
    export interface InstallCreateShortcutResult {
    }
    /**
     * Create a shortcut for an existing cave .
     */
    export const InstallCreateShortcut: import("butlerd/lib/support").RequestCreator<InstallCreateShortcutParams, InstallCreateShortcutResult>;
    /**
     * Result for Install.Perform
     */
    export interface InstallPerformResult {
        /** undocumented */
        caveId: string;
        /** undocumented */
        events: InstallEvent[];
    }
    /**
     * Perform an install that was previously queued via
     * @@InstallQueueParams.
     *
     * Can be cancelled by passing the same `ID` to @@InstallCancelParams.
     */
    export const InstallPerform: import("butlerd/lib/support").RequestCreator<InstallPerformParams, InstallPerformResult>;
    /**
     * Result for Install.Cancel
     */
    export interface InstallCancelResult {
        /** undocumented */
        didCancel: boolean;
    }
    /**
     * Attempt to gracefully cancel an ongoing operation.
     */
    export const InstallCancel: import("butlerd/lib/support").RequestCreator<InstallCancelParams, InstallCancelResult>;
    /**
     * Result for Uninstall.Perform
     */
    export interface UninstallPerformResult {
    }
    /**
     * UninstallParams contains all the parameters needed to perform
     * an uninstallation for a game via @@OperationStartParams.
     */
    export const UninstallPerform: import("butlerd/lib/support").RequestCreator<UninstallPerformParams, UninstallPerformResult>;
    /**
     * Result for Install.VersionSwitch.Queue
     */
    export interface InstallVersionSwitchQueueResult {
    }
    /**
     * Prepare to queue a version switch. The client will
     * receive an @@InstallVersionSwitchPickParams.
     */
    export const InstallVersionSwitchQueue: import("butlerd/lib/support").RequestCreator<InstallVersionSwitchQueueParams, InstallVersionSwitchQueueResult>;
    /**
     * Result for InstallVersionSwitchPick
     */
    export interface InstallVersionSwitchPickResult {
        /** A negative index aborts the version switch */
        index: number;
    }
    /**
     * Let the user pick which version to switch to.
     */
    export const InstallVersionSwitchPick: import("butlerd/lib/support").RequestCreator<InstallVersionSwitchPickParams, InstallVersionSwitchPickResult>;
    /**
     * GameCredentials contains all the credentials required to make API requests
     * including the download key if any.
     */
    export interface GameCredentials {
        /** A valid itch.io API key */
        apiKey: string;
        /** A download key identifier, or 0 if no download key is available */
        downloadKey?: number;
    }
    /**
     * Result for PickUpload
     */
    export interface PickUploadResult {
        /**
         * The index (in the original array) of the upload that was picked,
         * or a negative value to cancel.
         */
        index: number;
    }
    /**
     * Asks the user to pick between multiple available uploads
     */
    export const PickUpload: import("butlerd/lib/support").RequestCreator<PickUploadParams, PickUploadResult>;
    /**
     * Result for Install.Locations.List
     */
    export interface InstallLocationsListResult {
        /** undocumented */
        installLocations: InstallLocationSummary[];
    }
    /**
     * undocumented
     */
    export const InstallLocationsList: import("butlerd/lib/support").RequestCreator<InstallLocationsListParams, InstallLocationsListResult>;
    /**
     * Result for Install.Locations.Add
     */
    export interface InstallLocationsAddResult {
        /** undocumented */
        installLocation: InstallLocationSummary;
    }
    /**
     * undocumented
     */
    export const InstallLocationsAdd: import("butlerd/lib/support").RequestCreator<InstallLocationsAddParams, InstallLocationsAddResult>;
    /**
     * Result for Install.Locations.Remove
     */
    export interface InstallLocationsRemoveResult {
    }
    /**
     * undocumented
     */
    export const InstallLocationsRemove: import("butlerd/lib/support").RequestCreator<InstallLocationsRemoveParams, InstallLocationsRemoveResult>;
    /**
     * Result for Install.Locations.GetByID
     */
    export interface InstallLocationsGetByIDResult {
        /** undocumented */
        installLocation: InstallLocationSummary;
    }
    /**
     * undocumented
     */
    export const InstallLocationsGetByID: import("butlerd/lib/support").RequestCreator<InstallLocationsGetByIDParams, InstallLocationsGetByIDResult>;
    /**
     * Result for Install.Locations.Scan.ConfirmImport
     */
    export interface InstallLocationsScanConfirmImportResult {
        /** undocumented */
        confirm: boolean;
    }
    /**
     * Sent at the end of @@InstallLocationsScanParams
     */
    export const InstallLocationsScanConfirmImport: import("butlerd/lib/support").RequestCreator<InstallLocationsScanConfirmImportParams, InstallLocationsScanConfirmImportResult>;
    /**
     * Result for Install.Locations.Scan
     */
    export interface InstallLocationsScanResult {
        /** undocumented */
        numFoundItems: number;
        /** undocumented */
        numImportedItems: number;
    }
    /**
     * undocumented
     */
    export const InstallLocationsScan: import("butlerd/lib/support").RequestCreator<InstallLocationsScanParams, InstallLocationsScanResult>;
    /**
     * Result for Downloads.Queue
     */
    export interface DownloadsQueueResult {
    }
    /**
     * Queue a download that will be performed later by
     * @@DownloadsDriveParams.
     */
    export const DownloadsQueue: import("butlerd/lib/support").RequestCreator<DownloadsQueueParams, DownloadsQueueResult>;
    /**
     * Result for Downloads.Prioritize
     */
    export interface DownloadsPrioritizeResult {
    }
    /**
     * Put a download on top of the queue.
     */
    export const DownloadsPrioritize: import("butlerd/lib/support").RequestCreator<DownloadsPrioritizeParams, DownloadsPrioritizeResult>;
    /**
     * Result for Downloads.List
     */
    export interface DownloadsListResult {
        /** undocumented */
        downloads: Download[];
    }
    /**
     * List all known downloads.
     */
    export const DownloadsList: import("butlerd/lib/support").RequestCreator<DownloadsListParams, DownloadsListResult>;
    /**
     * Result for Downloads.ClearFinished
     */
    export interface DownloadsClearFinishedResult {
    }
    /**
     * Removes all finished downloads from the queue.
     */
    export const DownloadsClearFinished: import("butlerd/lib/support").RequestCreator<DownloadsClearFinishedParams, DownloadsClearFinishedResult>;
    /**
     * Result for Downloads.Drive
     */
    export interface DownloadsDriveResult {
    }
    /**
     * Drive downloads, which is: perform them one at a time,
     * until they're all finished.
     */
    export const DownloadsDrive: import("butlerd/lib/support").RequestCreator<DownloadsDriveParams, DownloadsDriveResult>;
    /**
     * Result for Downloads.Drive.Cancel
     */
    export interface DownloadsDriveCancelResult {
        /** undocumented */
        didCancel: boolean;
    }
    /**
     * Stop driving downloads gracefully.
     */
    export const DownloadsDriveCancel: import("butlerd/lib/support").RequestCreator<DownloadsDriveCancelParams, DownloadsDriveCancelResult>;
    /**
     * Payload for Downloads.Drive.Progress
     */
    export interface DownloadsDriveProgressNotification {
        /** undocumented */
        download: Download;
        /** undocumented */
        progress: DownloadProgress;
        /** BPS values for the last minute */
        speedHistory: number[];
    }
    /**
     * undocumented
     */
    export const DownloadsDriveProgress: import("butlerd/lib/support").NotificationCreator<DownloadsDriveProgressNotification>;
    /**
     * Payload for Downloads.Drive.Started
     */
    export interface DownloadsDriveStartedNotification {
        /** undocumented */
        download: Download;
    }
    /**
     * undocumented
     */
    export const DownloadsDriveStarted: import("butlerd/lib/support").NotificationCreator<DownloadsDriveStartedNotification>;
    /**
     * Payload for Downloads.Drive.Errored
     */
    export interface DownloadsDriveErroredNotification {
        /**
         * The download that errored. It contains all the error
         * information: a short message, a full stack trace,
         * and a butlerd error code.
         */
        download: Download;
    }
    /**
     * undocumented
     */
    export const DownloadsDriveErrored: import("butlerd/lib/support").NotificationCreator<DownloadsDriveErroredNotification>;
    /**
     * Payload for Downloads.Drive.Finished
     */
    export interface DownloadsDriveFinishedNotification {
        /** undocumented */
        download: Download;
    }
    /**
     * undocumented
     */
    export const DownloadsDriveFinished: import("butlerd/lib/support").NotificationCreator<DownloadsDriveFinishedNotification>;
    /**
     * Payload for Downloads.Drive.Discarded
     */
    export interface DownloadsDriveDiscardedNotification {
        /** undocumented */
        download: Download;
    }
    /**
     * undocumented
     */
    export const DownloadsDriveDiscarded: import("butlerd/lib/support").NotificationCreator<DownloadsDriveDiscardedNotification>;
    /**
     * Payload for Downloads.Drive.NetworkStatus
     */
    export interface DownloadsDriveNetworkStatusNotification {
        /** The current network status */
        status: NetworkStatus;
    }
    /**
     * Sent during @@DownloadsDriveParams to inform on network
     * status changes.
     */
    export const DownloadsDriveNetworkStatus: import("butlerd/lib/support").NotificationCreator<DownloadsDriveNetworkStatusNotification>;
    /**
     * undocumented
     */
    export enum NetworkStatus {
        Online = "online",
        Offline = "offline"
    }
    /**
     * undocumented
     */
    export enum DownloadReason {
        Install = "install",
        Reinstall = "reinstall",
        Update = "update",
        VersionSwitch = "version-switch"
    }
    /**
     * Represents a download queued, which will be
     * performed whenever @@DownloadsDriveParams is called.
     */
    export interface Download {
        /** undocumented */
        id: string;
        /** undocumented */
        error: string;
        /** undocumented */
        errorMessage: string;
        /** undocumented */
        errorCode: number;
        /** undocumented */
        reason: DownloadReason;
        /** undocumented */
        position: number;
        /** undocumented */
        caveId: string;
        /** undocumented */
        game: Game;
        /** undocumented */
        upload: Upload;
        /** undocumented */
        build: Build;
        /** undocumented */
        startedAt: RFCDate;
        /** undocumented */
        finishedAt: RFCDate;
        /** undocumented */
        stagingFolder: string;
    }
    /**
     * undocumented
     */
    export interface DownloadProgress {
        /** undocumented */
        stage: string;
        /** undocumented */
        progress: number;
        /** undocumented */
        eta: number;
        /** undocumented */
        bps: number;
    }
    /**
     * Result for Downloads.Retry
     */
    export interface DownloadsRetryResult {
    }
    /**
     * Retries a download that has errored
     */
    export const DownloadsRetry: import("butlerd/lib/support").RequestCreator<DownloadsRetryParams, DownloadsRetryResult>;
    /**
     * Result for Downloads.Discard
     */
    export interface DownloadsDiscardResult {
    }
    /**
     * Attempts to discard a download
     */
    export const DownloadsDiscard: import("butlerd/lib/support").RequestCreator<DownloadsDiscardParams, DownloadsDiscardResult>;
    /**
     * Result for CheckUpdate
     */
    export interface CheckUpdateResult {
        /** Any updates found (might be empty) */
        updates: GameUpdate[];
        /** Warnings messages logged while looking for updates */
        warnings: string[];
    }
    /**
     * Looks for game updates.
     *
     * If a list of cave identifiers is passed, will only look for
     * updates for these caves *and will ignore snooze*.
     *
     * Otherwise, will look for updates for all games, respecting snooze.
     *
     * Updates found are regularly sent via @@GameUpdateAvailableNotification, and
     * then all at once in the result.
     */
    export const CheckUpdate: import("butlerd/lib/support").RequestCreator<CheckUpdateParams, CheckUpdateResult>;
    /**
     * Result for SnoozeCave
     */
    export interface SnoozeCaveResult {
    }
    /**
     * Snoozing a cave means we ignore all new uploads (that would
     * be potential updates) between the cave's last install operation
     * and now.
     *
     * This can be undone by calling @@CheckUpdateParams with this specific
     * cave identifier.
     */
    export const SnoozeCave: import("butlerd/lib/support").RequestCreator<SnoozeCaveParams, SnoozeCaveResult>;
    /**
     * Result for Launch
     */
    export interface LaunchResult {
    }
    /**
     * Attempt to launch an installed game.
     */
    export const Launch: import("butlerd/lib/support").RequestCreator<LaunchParams, LaunchResult>;
    /**
     * Result for AcceptLicense
     */
    export interface AcceptLicenseResult {
        /**
         * true if the user accepts the terms of the license, false otherwise.
         * Note that false will cancel the launch.
         */
        accept: boolean;
    }
    /**
     * Sent during @@LaunchParams if the game/application comes with a service license
     * agreement.
     */
    export const AcceptLicense: import("butlerd/lib/support").RequestCreator<AcceptLicenseParams, AcceptLicenseResult>;
    /**
     * Result for PickManifestAction
     */
    export interface PickManifestActionResult {
        /** Index of action picked by user, or negative if aborting */
        index: number;
    }
    /**
     * Sent during @@LaunchParams, ask the user to pick a manifest action to launch.
     *
     * See [itch app manifests](https://itch.io/docs/itch/integrating/manifest.html).
     */
    export const PickManifestAction: import("butlerd/lib/support").RequestCreator<PickManifestActionParams, PickManifestActionResult>;
    /**
     * Result for ShellLaunch
     */
    export interface ShellLaunchResult {
    }
    /**
     * Ask the client to perform a shell launch, ie. open an item
     * with the operating system's default handler (File explorer).
     *
     * Sent during @@LaunchParams.
     */
    export const ShellLaunch: import("butlerd/lib/support").RequestCreator<ShellLaunchParams, ShellLaunchResult>;
    /**
     * Result for HTMLLaunch
     */
    export interface HTMLLaunchResult {
    }
    /**
     * Ask the client to perform an HTML launch, ie. open an HTML5
     * game, ideally in an embedded browser.
     *
     * Sent during @@LaunchParams.
     */
    export const HTMLLaunch: import("butlerd/lib/support").RequestCreator<HTMLLaunchParams, HTMLLaunchResult>;
    /**
     * Result for URLLaunch
     */
    export interface URLLaunchResult {
    }
    /**
     * Ask the client to perform an URL launch, ie. open an address
     * with the system browser or appropriate.
     *
     * Sent during @@LaunchParams.
     */
    export const URLLaunch: import("butlerd/lib/support").RequestCreator<URLLaunchParams, URLLaunchResult>;
    /**
     * Result for AllowSandboxSetup
     */
    export interface AllowSandboxSetupResult {
        /** Set to true if user allowed the sandbox setup, false otherwise */
        allow: boolean;
    }
    /**
     * Ask the user to allow sandbox setup. Will be followed by
     * a UAC prompt (on Windows) or a pkexec dialog (on Linux) if
     * the user allows.
     *
     * Sent during @@LaunchParams.
     */
    export const AllowSandboxSetup: import("butlerd/lib/support").RequestCreator<AllowSandboxSetupParams, AllowSandboxSetupResult>;
    /**
     * Result for PrereqsFailed
     */
    export interface PrereqsFailedResult {
        /** Set to true if the user wants to proceed with the launch in spite of the prerequisites failure */
        continue: boolean;
    }
    /**
     * Sent during @@LaunchParams, when one or more prerequisites have failed to install.
     * The user may choose to proceed with the launch anyway.
     */
    export const PrereqsFailed: import("butlerd/lib/support").RequestCreator<PrereqsFailedParams, PrereqsFailedResult>;
    /**
     * Result for System.StatFS
     */
    export interface SystemStatFSResult {
        /** undocumented */
        freeSize: number;
        /** undocumented */
        totalSize: number;
    }
    /**
     * Get information on a filesystem.
     */
    export const SystemStatFS: import("butlerd/lib/support").RequestCreator<SystemStatFSParams, SystemStatFSResult>;
    /**
     * Payload for Log
     */
    export interface LogNotification {
        /** Level of the message (`info`, `warn`, etc.) */
        level: LogLevel;
        /**
         * Contents of the message.
         *
         * Note: logs may contain non-ASCII characters, or even emojis.
         */
        message: string;
    }
    /**
     * Sent any time butler needs to send a log message. The client should
     * relay them in their own stdout / stderr, and collect them so they
     * can be part of an issue report if something goes wrong.
     */
    export const Log: import("butlerd/lib/support").NotificationCreator<LogNotification>;
    /**
     * undocumented
     */
    export enum LogLevel {
        Debug = "debug",
        Info = "info",
        Warning = "warning",
        Error = "error"
    }
    /**
     * Result for Test.Double
     */
    export interface TestDoubleResult {
        /** The number, doubled */
        number: number;
    }
    /**
     * Test request: return a number, doubled. Implement that to
     * use @@TestDoubleTwiceParams in your testing.
     */
    export const TestDouble: import("butlerd/lib/support").RequestCreator<TestDoubleParams, TestDoubleResult>;
    /**
     * butlerd JSON-RPC 2.0 error codes
     */
    export enum Code {
        OperationCancelled = 499,
        OperationAborted = 410,
        InstallFolderDisappeared = 404,
        NoCompatibleUploads = 2001,
        UnsupportedHost = 3001,
        NoLaunchCandidates = 5000,
        JavaRuntimeNeeded = 6000,
        NetworkDisconnected = 9000,
        APIError = 12000,
        DatabaseBusy = 16000,
        CantRemoveLocationBecauseOfActiveDownloads = 18000
    }
    /**
     * undocumented
     */
    export type Cursor = string;
    /**
     * undocumented
     */
    export interface Host {
        /** os + arch, e.g. windows-i386, linux-amd64 */
        runtime: Runtime;
        /** wrapper tool (wine, etc.) that butler can launch itself */
        wrapper: Wrapper;
        /** undocumented */
        remoteLaunchName: string;
    }
    /**
     * undocumented
     */
    export interface Wrapper {
        /** wrapper {HERE} game.exe --launch-editor */
        beforeTarget: string[];
        /** wrapper game.exe {HERE} --launch-editor */
        betweenTargetAndArgs: string[];
        /** wrapper game.exe --launch-editor {HERE} */
        afterArgs: string[];
        /** full path to the wrapper, like "wine" */
        wrapperBinary: string;
        /** additional environment variables */
        env: {
            [key: string]: string;
        };
        /**
         * When this is true, the wrapper can't function like this:
         *
         * $ wine /path/to/game.exe
         *
         * It needs to function like this:
         *
         * $ cd /path/to
         * $ wine game.exe
         *
         * This is at least true for wine, which cannot find required DLLs
         * otherwise. This might be true for other wrappers, so it's an option here.
         */
        needRelativeTarget: boolean;
    }
    /**
     * A Verdict contains a wealth of information on how to "launch" or "open" a specific
     * folder.
     */
    export interface Verdict {
        /** BasePath is the absolute path of the folder that was configured */
        basePath: string;
        /** TotalSize is the size in bytes of the folder and all its children, recursively */
        totalSize: number;
        /** Candidates is a list of potentially interesting files, with a lot of additional info */
        candidates: Candidate[];
    }
    /**
     * A Candidate is a potentially interesting launch target, be it
     * a native executable, a Java or Love2D bundle, an HTML index, etc.
     */
    export interface Candidate {
        /** Path is relative to the configured folder */
        path: string;
        /** Mode describes file permissions */
        mode: number;
        /** Depth is the number of path elements leading up to this candidate */
        depth: number;
        /** Flavor is the type of a candidate - native, html, jar etc. */
        flavor: Flavor;
        /** Arch describes the architecture of a candidate (where relevant) */
        arch: Arch;
        /** Size is the size of the candidate's file, in bytes */
        size: number;
        /** Spell contains raw output from <https://github.com/itchio/wizardry> */
        spell?: string[];
        /** WindowsInfo contains information specific to native Windows candidates */
        windowsInfo?: WindowsInfo;
        /** LinuxInfo contains information specific to native Linux candidates */
        linuxInfo?: LinuxInfo;
        /** MacosInfo contains information specific to native macOS candidates */
        macosInfo?: MacosInfo;
        /** LoveInfo contains information specific to Love2D bundles (`.love` files) */
        loveInfo?: LoveInfo;
        /** ScriptInfo contains information specific to shell scripts (`.sh`, `.bat` etc.) */
        scriptInfo?: ScriptInfo;
        /** JarInfo contains information specific to Java archives (`.jar` files) */
        jarInfo?: JarInfo;
    }
    /**
     * Flavor describes whether we're dealing with a native executables, a Java archive, a love2d bundle, etc.
     */
    export enum Flavor {
        NativeLinux = "linux",
        NativeMacos = "macos",
        NativeWindows = "windows",
        AppMacos = "app-macos",
        Script = "script",
        ScriptWindows = "windows-script",
        Jar = "jar",
        HTML = "html",
        Love = "love",
        MSI = "msi"
    }
    /**
     * The architecture of an executable
     */
    export enum Arch {
        _386 = "386",
        Amd64 = "amd64"
    }
    /**
     * Contains information specific to native windows executables
     * or installer packages.
     */
    export interface WindowsInfo {
        /** Particular type of installer (msi, inno, etc.) */
        installerType?: WindowsInstallerType;
        /** True if we suspect this might be an uninstaller rather than an installer */
        uninstaller?: boolean;
        /** Is this executable marked as GUI? This can be false and still pop a GUI, it's just a hint. */
        gui?: boolean;
        /** Is this a .NET assembly? */
        dotNet?: boolean;
    }
    /**
     * Which particular type of windows-specific installer
     */
    export enum WindowsInstallerType {
        Msi = "msi",
        Inno = "inno",
        Nullsoft = "nsis",
        Archive = "archive"
    }
    /**
     * Contains information specific to native macOS executables
     * or app bundles.
     */
    export interface MacosInfo {
    }
    /**
     * Contains information specific to native Linux executables
     */
    export interface LinuxInfo {
    }
    /**
     * Contains information specific to Love2D bundles
     */
    export interface LoveInfo {
        /** The version of love2D required to open this bundle. May be empty */
        version?: string;
    }
    /**
     * Contains information specific to shell scripts
     */
    export interface ScriptInfo {
        /** Something like `/bin/bash` */
        interpreter?: string;
    }
    /**
     * Contains information specific to Java archives
     */
    export interface JarInfo {
        /** The main Java class as specified by the manifest included in the .jar (if any) */
        mainClass?: string;
    }
    /**
     * User represents an itch.io account, with basic profile info
     */
    export interface User {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** The user's username (used for login) */
        username: string;
        /** The user's display name: human-friendly, may contain spaces, unicode etc. */
        displayName: string;
        /** Has the user opted into creating games? */
        developer: boolean;
        /** Is the user part of itch.io's press program? */
        pressUser: boolean;
        /** The address of the user's page on itch.io */
        url: string;
        /** User's avatar, may be a GIF */
        coverUrl: string;
        /** Static version of user's avatar, only set if the main cover URL is a GIF */
        stillCoverUrl: string;
    }
    /**
     * Game represents a page on itch.io, it could be a game,
     * a tool, a comic, etc.
     */
    export interface Game {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** Canonical address of the game's page on itch.io */
        url: string;
        /** Human-friendly title (may contain any character) */
        title: string;
        /** Human-friendly short description */
        shortText: string;
        /** Downloadable game, html game, etc. */
        type: GameType;
        /** Classification: game, tool, comic, etc. */
        classification: GameClassification;
        /** Configuration for embedded (HTML5) games */
        embed?: GameEmbedData;
        /** Cover url (might be a GIF) */
        coverUrl: string;
        /** Non-gif cover url, only set if main cover url is a GIF */
        stillCoverUrl: string;
        /** Date the game was created */
        createdAt: RFCDate;
        /** Date the game was published, empty if not currently published */
        publishedAt: RFCDate;
        /** Price in cents of a dollar */
        minPrice: number;
        /** Are payments accepted? */
        canBeBought: boolean;
        /** Does this game have a demo available? */
        hasDemo: boolean;
        /** Is this game part of the itch.io press system? */
        inPressSystem: boolean;
        /** Platforms this game is available for */
        platforms: Platforms;
        /** The user account this game is associated to */
        user?: User;
        /** ID of the user account this game is associated to */
        userId: number;
        /** The best current sale for this game */
        sale?: Sale;
        /** undocumented */
        viewsCount: number;
        /** undocumented */
        downloadsCount: number;
        /** undocumented */
        purchasesCount: number;
        /** undocumented */
        published: boolean;
    }
    /**
     * Platforms describes which OS/architectures a game or upload
     * is compatible with.
     */
    export interface Platforms {
        /** undocumented */
        windows: Architectures;
        /** undocumented */
        linux: Architectures;
        /** undocumented */
        osx: Architectures;
    }
    /**
     * Architectures describes a set of processor architectures (mostly 32-bit vs 64-bit)
     */
    export enum Architectures {
        All = "all",
        _386 = "386",
        Amd64 = "amd64"
    }
    /**
     * GameType is the type of an itch.io game page, mostly related to
     * how it should be presented on web (downloadable or embed)
     */
    export enum GameType {
        Default = "default",
        Flash = "flash",
        Unity = "unity",
        Java = "java",
        HTML = "html"
    }
    /**
     * GameClassification is the creator-picked classification for a page
     */
    export enum GameClassification {
        Game = "game",
        Tool = "tool",
        Assets = "assets",
        GameMod = "game_mod",
        PhysicalGame = "physical_game",
        Soundtrack = "soundtrack",
        Other = "other",
        Comic = "comic",
        Book = "book"
    }
    /**
     * GameEmbedData contains presentation information for embed games
     */
    export interface GameEmbedData {
        /** Game this embed info is for */
        gameId: number;
        /** width of the initial viewport, in pixels */
        width: number;
        /** height of the initial viewport, in pixels */
        height: number;
        /** for itch.io website, whether or not a fullscreen button should be shown */
        fullscreen: boolean;
    }
    /**
     * Sale describes a discount for a game.
     */
    export interface Sale {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** Game this sale is for */
        gameId: number;
        /**
         * Discount rate in percent.
         * Can be negative, see https://itch.io/updates/introducing-reverse-sales
         */
        rate: number;
        /** Timestamp the sale started at */
        startDate: RFCDate;
        /** Timestamp the sale ends at */
        endDate: RFCDate;
    }
    /**
     * An Upload is a downloadable file. Some are wharf-enabled, which means
     * they're actually a "channel" that may contain multiple builds, pushed
     * with <https://github.com/itchio/butler>
     */
    export interface Upload {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** Storage (hosted, external, etc.) */
        storage: UploadStorage;
        /** Host (if external storage) */
        host: string;
        /** Original file name (example: `Overland_x64.zip`) */
        filename: string;
        /** Human-friendly name set by developer (example: `Overland for Windows 64-bit`) */
        displayName: string;
        /** Size of upload in bytes. For wharf-enabled uploads, it's the archive size. */
        size: number;
        /** Name of the wharf channel for this upload, if it's a wharf-enabled upload */
        channelName: string;
        /** Latest build for this upload, if it's a wharf-enabled upload */
        build: Build;
        /** ID of the latest build for this upload, if it's a wharf-enabled upload */
        buildId: number;
        /** Upload type: default, soundtrack, etc. */
        type: UploadType;
        /** Is this upload a pre-order placeholder? */
        preorder: boolean;
        /** Is this upload a free demo? */
        demo: boolean;
        /** Platforms this upload is compatible with */
        platforms: Platforms;
        /** Date this upload was created at */
        createdAt: RFCDate;
        /** Date this upload was last updated at (order changed, display name set, etc.) */
        updatedAt: RFCDate;
    }
    /**
     * UploadStorage describes where an upload file is stored.
     */
    export enum UploadStorage {
        Hosted = "hosted",
        Build = "build",
        External = "external"
    }
    /**
     * UploadType describes what's in an upload - an executable,
     * a web game, some music, etc.
     */
    export enum UploadType {
        Default = "default",
        Flash = "flash",
        Unity = "unity",
        Java = "java",
        HTML = "html",
        Soundtrack = "soundtrack",
        Book = "book",
        Video = "video",
        Documentation = "documentation",
        Mod = "mod",
        AudioAssets = "audio_assets",
        GraphicalAssets = "graphical_assets",
        Sourcecode = "sourcecode",
        Other = "other"
    }
    /**
     * A Collection is a set of games, curated by humans.
     */
    export interface Collection {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** Human-friendly title for collection, for example `Couch coop games` */
        title: string;
        /** Date this collection was created at */
        createdAt: RFCDate;
        /** Date this collection was last updated at (item added, title set, etc.) */
        updatedAt: RFCDate;
        /**
         * Number of games in the collection. This might not be accurate
         * as some games might not be accessible to whoever is asking (project
         * page deleted, visibility level changed, etc.)
         */
        gamesCount: number;
        /** Games in this collection, with additional info */
        collectionGames: CollectionGame[];
        /** undocumented */
        userId: number;
        /** undocumented */
        user: User;
    }
    /**
     * CollectionGame represents a game's membership for a collection.
     */
    export interface CollectionGame {
        /** undocumented */
        collectionId: number;
        /** undocumented */
        collection: Collection;
        /** undocumented */
        gameId: number;
        /** undocumented */
        game: Game;
        /** undocumented */
        position: number;
        /** undocumented */
        createdAt: RFCDate;
        /** undocumented */
        updatedAt: RFCDate;
        /** undocumented */
        blurb: string;
        /** undocumented */
        userId: number;
    }
    /**
     * A DownloadKey is often generated when a purchase is made, it
     * allows downloading uploads for a game that are not available
     * for free. It can also be generated by other means.
     */
    export interface DownloadKey {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** Identifier of the game to which this download key grants access */
        gameId: number;
        /** Game to which this download key grants access */
        game: Game;
        /** Date this key was created at (often coincides with purchase time) */
        createdAt: RFCDate;
        /** Date this key was last updated at */
        updatedAt: RFCDate;
        /** Identifier of the itch.io user to which this key belongs */
        ownerId: number;
    }
    /**
     * Build contains information about a specific build
     */
    export interface Build {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /**
         * Identifier of the build before this one on the same channel,
         * or 0 if this is the initial build.
         */
        parentBuildId: number;
        /** State of the build: started, processing, etc. */
        state: BuildState;
        /** Automatically-incremented version number, starting with 1 */
        version: number;
        /**
         * Value specified by developer with `--userversion` when pushing a build
         * Might not be unique across builds of a given channel.
         */
        userVersion: string;
        /**
         * Files associated with this build - often at least an archive,
         * a signature, and a patch. Some might be missing while the build
         * is still processing or if processing has failed.
         */
        files: BuildFile[];
        /** User who pushed the build */
        user: User;
        /** Timestamp the build was created at */
        createdAt: RFCDate;
        /** Timestamp the build was last updated at */
        updatedAt: RFCDate;
    }
    /**
     * BuildState describes the state of a build, relative to its initial upload, and
     * its processing.
     */
    export enum BuildState {
        Started = "started",
        Processing = "processing",
        Completed = "completed",
        Failed = "failed"
    }
    /**
     * BuildFile contains information about a build's "file", which could be its
     * archive, its signature, its patch, etc.
     */
    export interface BuildFile {
        /** Site-wide unique identifier generated by itch.io */
        id: number;
        /** Size of this build file */
        size: number;
        /** State of this file: created, uploading, uploaded, etc. */
        state: BuildFileState;
        /** Type of this build file: archive, signature, patch, etc. */
        type: BuildFileType;
        /** Subtype of this build file, usually indicates compression */
        subType: BuildFileSubType;
        /** Date this build file was created at */
        createdAt: RFCDate;
        /** Date this build file was last updated at */
        updatedAt: RFCDate;
    }
    /**
     * BuildFileState describes the state of a specific file for a build
     */
    export enum BuildFileState {
        Created = "created",
        Uploading = "uploading",
        Uploaded = "uploaded",
        Failed = "failed"
    }
    /**
     * BuildFileType describes the type of a build file: patch, archive, signature, etc.
     */
    export enum BuildFileType {
        Patch = "patch",
        Archive = "archive",
        Signature = "signature",
        Manifest = "manifest",
        Unpacked = "unpacked"
    }
    /**
     * BuildFileSubType describes the subtype of a build file: mostly its compression
     * level. For example, rediff'd patches are "optimized", whereas initial patches are "default"
     */
    export enum BuildFileSubType {
        Default = "default",
        Gzip = "gzip",
        Optimized = "optimized"
    }
    /**
     * undocumented
     */
    export interface InstallEvent {
        /** undocumented */
        type: InstallEventType;
        /** undocumented */
        timestamp: RFCDate;
        /** undocumented */
        heal: HealInstallEvent;
        /** undocumented */
        install: InstallInstallEvent;
        /** undocumented */
        upgrade: UpgradeInstallEvent;
        /** undocumented */
        ghostBusting: GhostBustingInstallEvent;
        /** undocumented */
        patching: PatchingInstallEvent;
        /** undocumented */
        problem: ProblemInstallEvent;
        /** undocumented */
        fallback: FallbackInstallEvent;
    }
    /**
     * undocumented
     */
    export enum InstallEventType {
        InstallEventResume = "resume",
        InstallEventStop = "stop",
        InstallEventInstall = "install",
        InstallEventHeal = "heal",
        InstallEventUpgrade = "upgrade",
        InstallEventPatching = "patching",
        InstallEventGhostBusting = "ghostBusting",
        InstallEventProblem = "problem",
        InstallEventFallback = "fallback"
    }
    /**
     * undocumented
     */
    export interface InstallInstallEvent {
        /** undocumented */
        manager: string;
    }
    /**
     * undocumented
     */
    export interface HealInstallEvent {
        /** undocumented */
        totalCorrupted: number;
        /** undocumented */
        appliedCaseFixes: boolean;
    }
    /**
     * undocumented
     */
    export interface UpgradeInstallEvent {
        /** undocumented */
        numPatches: number;
    }
    /**
     * undocumented
     */
    export interface ProblemInstallEvent {
        /** Short error */
        error: string;
        /** Longer error */
        errorStack: string;
    }
    /**
     * undocumented
     */
    export interface FallbackInstallEvent {
        /** Name of the operation we were trying to do */
        attempted: string;
        /** Problem encountered while trying "attempted" */
        problem: ProblemInstallEvent;
        /** Name of the operation we're falling back to */
        nowTrying: string;
    }
    /**
     * undocumented
     */
    export interface PatchingInstallEvent {
        /** Build we patched to */
        buildID: number;
        /** "default" or "optimized" (for the +bsdiff variant) */
        subtype: string;
    }
    /**
     * undocumented
     */
    export interface GhostBustingInstallEvent {
        /** Operation that requested the ghost busting (install, upgrade, heal) */
        operation: string;
        /** Number of ghost files found */
        found: number;
        /** Number of ghost files removed */
        removed: number;
    }
    /**
     * A Receipt describes what was installed to a specific folder.
     *
     * It's compressed and written to `./.itch/receipt.json.gz` every
     * time an install operation completes successfully, and is used
     * in further install operations to make sure ghosts are busted and/or
     * angels are saved.
     */
    export interface Receipt {
        /** The itch.io game installed at this location */
        game: Game;
        /** The itch.io upload installed at this location */
        upload: Upload;
        /** The itch.io build installed at this location. Null for non-wharf upload. */
        build: Build;
        /** A list of installed files (slash-separated paths, relative to install folder) */
        files: string[];
        /** The installer used to install at this location */
        installerName?: string;
    }
    /**
     * A Manifest describes prerequisites (dependencies) and actions that
     * can be taken while launching a game.
     */
    export interface Manifest {
        /** Actions are a list of options to give the user when launching a game. */
        actions: Actions;
        /**
         * Prereqs describe libraries or frameworks that must be installed
         * prior to launching a game
         */
        prereqs: Prereq[];
    }
    /**
     * undocumented
     */
    export type Actions = Action[];
    /**
     * An Action is a choice for the user to pick when launching a game.
     *
     * see https://itch.io/docs/itch/integrating/manifest.html
     */
    export interface Action {
        /** human-readable or standard name */
        name: string;
        /** file path (relative to manifest or absolute), URL, etc. */
        path: string;
        /** icon name (see static/fonts/icomoon/demo.html, don't include `icon-` prefix) */
        icon: string;
        /** command-line arguments */
        args: string[];
        /** sandbox opt-in */
        sandbox: boolean;
        /** requested API scope */
        scope: string;
        /** don't redirect stdout/stderr, open in new console window */
        console: boolean;
        /** platform to restrict this action to */
        platform: Platform;
        /** localized action name */
        locales: {
            [key: string]: ActionLocale;
        };
    }
    /**
     * undocumented
     */
    export interface Prereq {
        /** A prerequisite to be installed, see <https://itch.io/docs/itch/integrating/prereqs/> for the full list. */
        name: string;
    }
    /**
     * undocumented
     */
    export interface ActionLocale {
        /** A localized action name */
        name: string;
    }
    /**
     * undocumented
     */
    export enum Platform {
        OSX = "osx",
        Windows = "windows",
        Linux = "linux",
        Unknown = "unknown"
    }
    /**
     * Runtime describes an os-arch combo in a convenient way
     */
    export interface Runtime {
        /** undocumented */
        platform: Platform;
        /** undocumented */
        is64: boolean;
    }
    /**
     * undocumented
     */
    export type Runtimes = Runtime[];
    /**
     * Params for Meta.Authenticate
     */
    export interface MetaAuthenticateParams {
        /** undocumented */
        secret: string;
    }
    /**
     * Params for Meta.Flow
     */
    export interface MetaFlowParams {
    }
    /**
     * Params for Meta.Shutdown
     */
    export interface MetaShutdownParams {
    }
    /**
     * Payload for MetaFlowEstablished
     */
    export interface MetaFlowEstablishedNotification {
        /** The identifier of the daemon process for which the flow was established */
        pid: number;
    }
    /**
     * The first notification sent when @@MetaFlowParams is called.
     */
    export const MetaFlowEstablished: import("butlerd/lib/support").NotificationCreator<MetaFlowEstablishedNotification>;
    /**
     * Params for Version.Get
     */
    export interface VersionGetParams {
    }
    /**
     * Params for Network.SetSimulateOffline
     */
    export interface NetworkSetSimulateOfflineParams {
        /**
         * If true, all operations after this point will behave
         * as if there were no network connections
         */
        enabled: boolean;
    }
    /**
     * Params for Network.SetBandwidthThrottle
     */
    export interface NetworkSetBandwidthThrottleParams {
        /** If true, will limit. If false, will clear any bandwidth throttles in place */
        enabled: boolean;
        /** The target bandwidth, in kbps */
        rate: number;
    }
    /**
     * Params for Profile.List
     */
    export interface ProfileListParams {
    }
    /**
     * Params for Profile.LoginWithPassword
     */
    export interface ProfileLoginWithPasswordParams {
        /** The username (or e-mail) to use for login */
        username: string;
        /** The password to use */
        password: string;
        /** Set to true if you want to force recaptcha */
        forceRecaptcha?: boolean;
    }
    /**
     * Params for Profile.LoginWithAPIKey
     */
    export interface ProfileLoginWithAPIKeyParams {
        /** The API token to use */
        apiKey: string;
    }
    /**
     * Params for Profile.RequestCaptcha
     */
    export interface ProfileRequestCaptchaParams {
        /** Address of page containing a recaptcha widget */
        recaptchaUrl: string;
    }
    /**
     * Params for Profile.RequestTOTP
     */
    export interface ProfileRequestTOTPParams {
    }
    /**
     * Params for Profile.UseSavedLogin
     */
    export interface ProfileUseSavedLoginParams {
        /** undocumented */
        profileId: number;
    }
    /**
     * Params for Profile.Forget
     */
    export interface ProfileForgetParams {
        /** undocumented */
        profileId: number;
    }
    /**
     * Params for Profile.Data.Put
     */
    export interface ProfileDataPutParams {
        /** undocumented */
        profileId: number;
        /** undocumented */
        key: string;
        /** undocumented */
        value: string;
    }
    /**
     * Params for Profile.Data.Get
     */
    export interface ProfileDataGetParams {
        /** undocumented */
        profileId: number;
        /** undocumented */
        key: string;
    }
    /**
     * Params for Search.Games
     */
    export interface SearchGamesParams {
        /** undocumented */
        profileId: number;
        /** undocumented */
        query: string;
    }
    /**
     * Params for Search.Users
     */
    export interface SearchUsersParams {
        /** undocumented */
        profileId: number;
        /** undocumented */
        query: string;
    }
    /**
     * Params for Fetch.Game
     */
    export interface FetchGameParams {
        /** Identifier of game to look for */
        gameId: number;
        /** Force an API request */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.GameRecords
     */
    export interface FetchGameRecordsParams {
        /** Profile to use to fetch game */
        profileId: number;
        /** Source from which to fetch games */
        source: GameRecordsSource;
        /** Collection ID, required if `Source` is "collection" */
        collectionId?: number;
        /** Maximum number of games to return at a time */
        limit?: number;
        /** Games to skip */
        offset?: number;
        /** When specified only shows game titles that contain this string */
        search?: string;
        /** Criterion to sort by */
        sortBy?: string;
        /** Filters */
        filters?: GameRecordsFilters;
        /** undocumented */
        reverse?: boolean;
        /** If set, will force fresh data */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.DownloadKey
     */
    export interface FetchDownloadKeyParams {
        /** undocumented */
        downloadKeyId: number;
        /** undocumented */
        profileId: number;
        /** Force an API request */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.DownloadKeys
     */
    export interface FetchDownloadKeysParams {
        /** undocumented */
        profileId: number;
        /** Number of items to skip */
        offset?: number;
        /** Max number of results per page (default = 5) */
        limit?: number;
        /** Filter results */
        filters?: FetchDownloadKeysFilter;
        /** Force an API request */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.GameUploads
     */
    export interface FetchGameUploadsParams {
        /** Identifier of the game whose uploads we should look for */
        gameId: number;
        /** Only returns compatible uploads */
        compatible: boolean;
        /** Force an API request */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.User
     */
    export interface FetchUserParams {
        /** Identifier of the user to look for */
        userId: number;
        /** Profile to use to look upser */
        profileId: number;
        /** Force an API request */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.Sale
     */
    export interface FetchSaleParams {
        /** Identifier of the game for which to look for a sale */
        gameId: number;
    }
    /**
     * Params for Fetch.Collection
     */
    export interface FetchCollectionParams {
        /** Profile to use to fetch collection */
        profileId: number;
        /** Collection to fetch */
        collectionId: number;
        /**
         * Force an API request before replying.
         * Usually set after getting 'stale' in the response.
         */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.Collection.Games
     */
    export interface FetchCollectionGamesParams {
        /** Profile to use to fetch collection */
        profileId: number;
        /** Identifier of the collection to look for */
        collectionId: number;
        /** Maximum number of games to return at a time. */
        limit?: number;
        /** When specified only shows game titles that contain this string */
        search?: string;
        /** Criterion to sort by */
        sortBy?: string;
        /** Filters */
        filters?: CollectionGamesFilters;
        /** undocumented */
        reverse?: boolean;
        /** Used for pagination, if specified */
        cursor?: Cursor;
        /** If set, will force fresh data */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.ProfileCollections
     */
    export interface FetchProfileCollectionsParams {
        /** Profile for which to fetch collections */
        profileId: number;
        /** Maximum number of collections to return at a time. */
        limit?: number;
        /** When specified only shows collection titles that contain this string */
        search?: string;
        /** Criterion to sort by */
        sortBy?: string;
        /** undocumented */
        reverse?: boolean;
        /** Used for pagination, if specified */
        cursor?: Cursor;
        /** If set, will force fresh data */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.ProfileGames
     */
    export interface FetchProfileGamesParams {
        /** Profile for which to fetch games */
        profileId: number;
        /** Maximum number of items to return at a time. */
        limit?: number;
        /** When specified only shows game titles that contain this string */
        search?: string;
        /** Criterion to sort by */
        sortBy?: string;
        /** Filters */
        filters?: ProfileGameFilters;
        /** undocumented */
        reverse?: boolean;
        /** Used for pagination, if specified */
        cursor?: Cursor;
        /** If set, will force fresh data */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.ProfileOwnedKeys
     */
    export interface FetchProfileOwnedKeysParams {
        /** Profile to use to fetch game */
        profileId: number;
        /** Maximum number of owned keys to return at a time. */
        limit?: number;
        /** When specified only shows game titles that contain this string */
        search?: string;
        /** Criterion to sort by */
        sortBy?: string;
        /** Filters */
        filters?: ProfileOwnedKeysFilters;
        /** undocumented */
        reverse?: boolean;
        /** Used for pagination, if specified */
        cursor?: Cursor;
        /** If set, will force fresh data */
        fresh?: boolean;
    }
    /**
     * Params for Fetch.Commons
     */
    export interface FetchCommonsParams {
    }
    /**
     * Params for Fetch.Caves
     */
    export interface FetchCavesParams {
        /** Maximum number of caves to return at a time. */
        limit?: number;
        /** When specified only shows game titles that contain this string */
        search?: string;
        /** undocumented */
        sortBy?: string;
        /** Filters */
        filters?: CavesFilters;
        /** undocumented */
        reverse?: boolean;
        /** Used for pagination, if specified */
        cursor?: Cursor;
    }
    /**
     * Params for Fetch.Cave
     */
    export interface FetchCaveParams {
        /** undocumented */
        caveId: string;
    }
    /**
     * Params for Fetch.ExpireAll
     */
    export interface FetchExpireAllParams {
    }
    /**
     * Params for Game.FindUploads
     */
    export interface GameFindUploadsParams {
        /** Which game to find uploads for */
        game: Game;
    }
    /**
     * Params for Install.Queue
     */
    export interface InstallQueueParams {
        /**
         * ID of the cave to perform the install for.
         * If not specified, will create a new cave.
         */
        caveId?: string;
        /** If unspecified, will default to 'install' */
        reason?: DownloadReason;
        /**
         * If CaveID is not specified, ID of an install location
         * to install to.
         */
        installLocationId?: string;
        /**
         * If set, InstallFolder can be set and no cave
         * record will be read or modified
         */
        noCave?: boolean;
        /** When NoCave is set, exactly where to install */
        installFolder?: string;
        /**
         * Which game to install.
         *
         * If unspecified and caveId is specified, the same game will be used.
         */
        game?: Game;
        /**
         * Which upload to install.
         *
         * If unspecified and caveId is specified, the same upload will be used.
         */
        upload?: Upload;
        /**
         * Which build to install
         *
         * If unspecified and caveId is specified, the same build will be used.
         */
        build?: Build;
        /**
         * If true, do not run windows installers, just extract
         * whatever to the install folder.
         */
        ignoreInstallers?: boolean;
        /**
         * A folder that butler can use to store temporary files, like
         * partial downloads, checkpoint files, etc.
         */
        stagingFolder?: string;
        /**
         * If set, and the install operation is successfully disambiguated,
         * will queue it as a download for butler to drive.
         * See @@DownloadsDriveParams.
         */
        queueDownload?: boolean;
        /** Don't run install prepare (assume we can just run it at perform time) */
        fastQueue?: boolean;
    }
    /**
     * Params for Install.Plan
     */
    export interface InstallPlanParams {
        /** The ID of the game we're planning to install */
        gameId: number;
        /** The download session ID to use for this install plan */
        downloadSessionId?: string;
        /** undocumented */
        uploadId?: number;
    }
    /**
     * Params for Caves.SetPinned
     */
    export interface CavesSetPinnedParams {
        /** ID of the cave to pin/unpin */
        caveId: string;
        /** Pinned state the cave should have after this call */
        pinned: boolean;
    }
    /**
     * Params for Install.CreateShortcut
     */
    export interface InstallCreateShortcutParams {
        /** undocumented */
        caveId: string;
    }
    /**
     * Params for Install.Perform
     */
    export interface InstallPerformParams {
        /** ID that can be later used in @@InstallCancelParams */
        id: string;
        /** The folder turned by @@InstallQueueParams */
        stagingFolder: string;
    }
    /**
     * Params for Install.Cancel
     */
    export interface InstallCancelParams {
        /** The UUID of the task to cancel, as passed to @@OperationStartParams */
        id: string;
    }
    /**
     * Params for Uninstall.Perform
     */
    export interface UninstallPerformParams {
        /** The cave to uninstall */
        caveId: string;
        /**
         * If true, don't attempt to run any uninstallers, just
         * remove the DB record and burn the install folder to the ground.
         */
        hard?: boolean;
    }
    /**
     * Params for Install.VersionSwitch.Queue
     */
    export interface InstallVersionSwitchQueueParams {
        /** The cave to switch to a different version */
        caveId: string;
    }
    /**
     * Params for InstallVersionSwitchPick
     */
    export interface InstallVersionSwitchPickParams {
        /** undocumented */
        cave: Cave;
        /** undocumented */
        upload: Upload;
        /** undocumented */
        builds: Build[];
    }
    /**
     * Params for PickUpload
     */
    export interface PickUploadParams {
        /** An array of upload objects to choose from */
        uploads: Upload[];
    }
    /**
     * Payload for Progress
     */
    export interface ProgressNotification {
        /** An overall progress value between 0 and 1 */
        progress: number;
        /** Estimated completion time for the operation, in seconds (floating) */
        eta: number;
        /** Network bandwidth used, in bytes per second (floating) */
        bps: number;
    }
    /**
     * Sent periodically during @@InstallPerformParams to inform on the current state of an install
     */
    export const Progress: import("butlerd/lib/support").NotificationCreator<ProgressNotification>;
    /**
     * undocumented
     */
    export enum TaskReason {
        Install = "install",
        Uninstall = "uninstall"
    }
    /**
     * undocumented
     */
    export enum TaskType {
        Download = "download",
        Install = "install",
        Uninstall = "uninstall",
        Update = "update",
        Heal = "heal"
    }
    /**
     * Payload for TaskStarted
     */
    export interface TaskStartedNotification {
        /** Why this task was started */
        reason: TaskReason;
        /** Is this task a download? An install? */
        type: TaskType;
        /** The game this task is dealing with */
        game: Game;
        /** The upload this task is dealing with */
        upload: Upload;
        /** The build this task is dealing with (if any) */
        build: Build;
        /** Total size in bytes */
        totalSize: number;
    }
    /**
     * Each operation is made up of one or more tasks. This notification
     * is sent during @@OperationStartParams whenever a specific task starts.
     */
    export const TaskStarted: import("butlerd/lib/support").NotificationCreator<TaskStartedNotification>;
    /**
     * Payload for TaskSucceeded
     */
    export interface TaskSucceededNotification {
        /** undocumented */
        type: TaskType;
        /**
         * If the task installed something, then this contains
         * info about the game, upload, build that were installed
         */
        installResult: InstallResult;
    }
    /**
     * Sent during @@OperationStartParams whenever a task succeeds for an operation.
     */
    export const TaskSucceeded: import("butlerd/lib/support").NotificationCreator<TaskSucceededNotification>;
    /**
     * What was installed by a subtask of @@OperationStartParams.
     *
     * See @@TaskSucceededNotification.
     */
    export interface InstallResult {
        /** The game we installed */
        game: Game;
        /** The upload we installed */
        upload: Upload;
        /** The build we installed */
        build?: Build;
    }
    /**
     * Params for Install.Locations.List
     */
    export interface InstallLocationsListParams {
    }
    /**
     * Params for Install.Locations.Add
     */
    export interface InstallLocationsAddParams {
        /**
         * identifier of the new install location.
         * if not specified, will be generated.
         */
        id?: string;
        /** path of the new install location */
        path: string;
    }
    /**
     * Params for Install.Locations.Remove
     */
    export interface InstallLocationsRemoveParams {
        /** identifier of the install location to remove */
        id: string;
    }
    /**
     * Params for Install.Locations.GetByID
     */
    export interface InstallLocationsGetByIDParams {
        /** identifier of the install location to remove */
        id: string;
    }
    /**
     * Params for Install.Locations.Scan
     */
    export interface InstallLocationsScanParams {
        /** path to a legacy marketDB */
        legacyMarketPath?: string;
    }
    /**
     * Payload for Install.Locations.Scan.Yield
     */
    export interface InstallLocationsScanYieldNotification {
        /** undocumented */
        game: Game;
    }
    /**
     * Sent during @@InstallLocationsScanParams whenever
     * a game is found.
     */
    export const InstallLocationsScanYield: import("butlerd/lib/support").NotificationCreator<InstallLocationsScanYieldNotification>;
    /**
     * Params for Install.Locations.Scan.ConfirmImport
     */
    export interface InstallLocationsScanConfirmImportParams {
        /** number of items that will be imported */
        numItems: number;
    }
    /**
     * Params for Downloads.Queue
     */
    export interface DownloadsQueueParams {
        /** undocumented */
        item: InstallQueueResult;
    }
    /**
     * Params for Downloads.Prioritize
     */
    export interface DownloadsPrioritizeParams {
        /** undocumented */
        downloadId: string;
    }
    /**
     * Params for Downloads.List
     */
    export interface DownloadsListParams {
    }
    /**
     * Params for Downloads.ClearFinished
     */
    export interface DownloadsClearFinishedParams {
    }
    /**
     * Params for Downloads.Drive
     */
    export interface DownloadsDriveParams {
    }
    /**
     * Params for Downloads.Drive.Cancel
     */
    export interface DownloadsDriveCancelParams {
    }
    /**
     * Params for Downloads.Retry
     */
    export interface DownloadsRetryParams {
        /** undocumented */
        downloadId: string;
    }
    /**
     * Params for Downloads.Discard
     */
    export interface DownloadsDiscardParams {
        /** undocumented */
        downloadId: string;
    }
    /**
     * Params for CheckUpdate
     */
    export interface CheckUpdateParams {
        /** If specified, will only look for updates to these caves */
        caveIds?: string[];
        /** If specified, will log information even when we have no warnings/errors */
        verbose?: boolean;
    }
    /**
     * Payload for GameUpdateAvailable
     */
    export interface GameUpdateAvailableNotification {
        /** undocumented */
        update: GameUpdate;
    }
    /**
     * Sent during @@CheckUpdateParams, every time butler
     * finds an update for a game. Can be safely ignored if displaying
     * updates as they are found is not a requirement for the client.
     */
    export const GameUpdateAvailable: import("butlerd/lib/support").NotificationCreator<GameUpdateAvailableNotification>;
    /**
     * Describes an available update for a particular game install.
     */
    export interface GameUpdate {
        /** Cave we found an update for */
        caveId: string;
        /** Game we found an update for */
        game: Game;
        /**
         * True if this is a direct update, ie. we're on
         * a channel that still exists, and there's a new build
         * False if it's an indirect update, for example a new
         * upload that appeared after we installed, but we're
         * not sure if it's an upgrade or other additional content
         */
        direct: boolean;
        /** Available choice of updates */
        choices: GameUpdateChoice[];
    }
    /**
     * Params for SnoozeCave
     */
    export interface SnoozeCaveParams {
        /** undocumented */
        caveId: string;
    }
    /**
     * One possible upload/build choice to upgrade a cave
     */
    export interface GameUpdateChoice {
        /** Upload to be installed */
        upload: Upload;
        /** Build to be installed (may be nil) */
        build: Build;
        /** How confident we are that this is the right upgrade */
        confidence: number;
    }
    /**
     * Params for Launch
     */
    export interface LaunchParams {
        /** The ID of the cave to launch */
        caveId: string;
        /** The directory to use to store installer files for prerequisites */
        prereqsDir: string;
        /** Force installing all prerequisites, even if they're already marked as installed */
        forcePrereqs?: boolean;
        /** Enable sandbox (regardless of manifest opt-in) */
        sandbox?: boolean;
    }
    /**
     * Payload for LaunchRunning
     */
    export interface LaunchRunningNotification {
    }
    /**
     * Sent during @@LaunchParams, when the game is configured, prerequisites are installed
     * sandbox is set up (if enabled), and the game is actually running.
     */
    export const LaunchRunning: import("butlerd/lib/support").NotificationCreator<LaunchRunningNotification>;
    /**
     * Payload for LaunchExited
     */
    export interface LaunchExitedNotification {
    }
    /**
     * Sent during @@LaunchParams, when the game has actually exited.
     */
    export const LaunchExited: import("butlerd/lib/support").NotificationCreator<LaunchExitedNotification>;
    /**
     * Params for AcceptLicense
     */
    export interface AcceptLicenseParams {
        /**
         * The full text of the license agreement, in its default
         * language, which is usually English.
         */
        text: string;
    }
    /**
     * Params for PickManifestAction
     */
    export interface PickManifestActionParams {
        /** A list of actions to pick from. Must be shown to the user in the order they're passed. */
        actions: Action[];
    }
    /**
     * Params for ShellLaunch
     */
    export interface ShellLaunchParams {
        /** Absolute path of item to open, e.g. `D:\\Games\\Itch\\garden\\README.txt` */
        itemPath: string;
    }
    /**
     * Params for HTMLLaunch
     */
    export interface HTMLLaunchParams {
        /** Absolute path on disk to serve */
        rootFolder: string;
        /** Path of index file, relative to root folder */
        indexPath: string;
        /** Command-line arguments, to pass as `global.Itch.args` */
        args: string[];
        /** Environment variables, to pass as `global.Itch.env` */
        env: {
            [key: string]: string;
        };
    }
    /**
     * Params for URLLaunch
     */
    export interface URLLaunchParams {
        /** URL to open, e.g. `https://itch.io/community` */
        url: string;
    }
    /**
     * Params for AllowSandboxSetup
     */
    export interface AllowSandboxSetupParams {
    }
    /**
     * Payload for PrereqsStarted
     */
    export interface PrereqsStartedNotification {
        /** A list of prereqs that need to be tended to */
        tasks: {
            [key: string]: PrereqTask;
        };
    }
    /**
     * Sent during @@LaunchParams, when some prerequisites are about to be installed.
     *
     * This is a good time to start showing a UI element with the state of prereq
     * tasks.
     *
     * Updates are regularly provided via @@PrereqsTaskStateNotification.
     */
    export const PrereqsStarted: import("butlerd/lib/support").NotificationCreator<PrereqsStartedNotification>;
    /**
     * Information about a prerequisite task.
     */
    export interface PrereqTask {
        /** Full name of the prerequisite, for example: `Microsoft .NET Framework 4.6.2` */
        fullName: string;
        /** Order of task in the list. Respect this order in the UI if you want consistent progress indicators. */
        order: number;
    }
    /**
     * Payload for PrereqsTaskState
     */
    export interface PrereqsTaskStateNotification {
        /** Short name of the prerequisite task (e.g. `xna-4.0`) */
        name: string;
        /** Current status of the prereq */
        status: PrereqStatus;
        /** Value between 0 and 1 (floating) */
        progress: number;
        /** ETA in seconds (floating) */
        eta: number;
        /** Network bandwidth used in bytes per second (floating) */
        bps: number;
    }
    /**
     * Current status of a prerequisite task
     *
     * Sent during @@LaunchParams, after @@PrereqsStartedNotification, repeatedly
     * until all prereq tasks are done.
     */
    export const PrereqsTaskState: import("butlerd/lib/support").NotificationCreator<PrereqsTaskStateNotification>;
    /**
     * undocumented
     */
    export enum PrereqStatus {
        Pending = "pending",
        Downloading = "downloading",
        Ready = "ready",
        Installing = "installing",
        Done = "done"
    }
    /**
     * Payload for PrereqsEnded
     */
    export interface PrereqsEndedNotification {
    }
    /**
     * Sent during @@LaunchParams, when all prereqs have finished installing (successfully or not)
     *
     * After this is received, it's safe to close any UI element showing prereq task state.
     */
    export const PrereqsEnded: import("butlerd/lib/support").NotificationCreator<PrereqsEndedNotification>;
    /**
     * Params for PrereqsFailed
     */
    export interface PrereqsFailedParams {
        /** Short error */
        error: string;
        /** Longer error (to include in logs) */
        errorStack: string;
    }
    /**
     * Params for CleanDownloads.Search
     */
    export interface CleanDownloadsSearchParams {
        /** A list of folders to scan for potential subfolders to clean up */
        roots: string[];
        /**
         * A list of subfolders to not consider when cleaning
         * (staging folders for in-progress downloads)
         */
        whitelist: string[];
    }
    /**
     * Result for CleanDownloads.Search
     */
    export interface CleanDownloadsSearchResult {
        /** Entries we found that could use some cleaning (with path and size information) */
        entries: CleanDownloadsEntry[];
    }
    /**
     * Look for folders we can clean up in various download folders.
     * This finds anything that doesn't correspond to any current downloads
     * we know about.
     */
    export const CleanDownloadsSearch: import("butlerd/lib/support").RequestCreator<CleanDownloadsSearchParams, CleanDownloadsSearchResult>;
    /**
     * undocumented
     */
    export interface CleanDownloadsEntry {
        /** The complete path of the file or folder we intend to remove */
        path: string;
        /** The size of the folder or file, in bytes */
        size: number;
    }
    /**
     * Params for CleanDownloads.Apply
     */
    export interface CleanDownloadsApplyParams {
        /** undocumented */
        entries: CleanDownloadsEntry[];
    }
    /**
     * Result for CleanDownloads.Apply
     */
    export interface CleanDownloadsApplyResult {
    }
    /**
     * Remove the specified entries from disk, freeing up disk space.
     */
    export const CleanDownloadsApply: import("butlerd/lib/support").RequestCreator<CleanDownloadsApplyParams, CleanDownloadsApplyResult>;
    /**
     * Params for System.StatFS
     */
    export interface SystemStatFSParams {
        /** undocumented */
        path: string;
    }
    /**
     * Params for Test.DoubleTwice
     */
    export interface TestDoubleTwiceParams {
        /** The number to quadruple */
        number: number;
    }
    /**
     * Result for Test.DoubleTwice
     */
    export interface TestDoubleTwiceResult {
        /** The input, quadrupled */
        number: number;
    }
    /**
     * Test request: asks butler to double a number twice.
     * First by calling @@TestDoubleParams, then by
     * returning the result of that call doubled.
     *
     * Use that to try out your JSON-RPC 2.0 over TCP implementation.
     */
    export const TestDoubleTwice: import("butlerd/lib/support").RequestCreator<TestDoubleTwiceParams, TestDoubleTwiceResult>;
    /**
     * Params for Test.Double
     */
    export interface TestDoubleParams {
        /** The number to double */
        number: number;
    }
}
declare module "common/logger/index" {
    import memory from "memory-streams";
    export const levels: {
        [key: number]: string;
        default: string;
    };
    export interface LogEntry {
        time: number;
        level: number;
        msg: string;
        name?: string;
    }
    export interface LogSink {
        write(entry: LogEntry): any;
    }
    export class Logger {
        private name;
        sink: LogSink;
        constructor(sink: LogSink, name?: string);
        debug(msg: string): void;
        info(msg: string): void;
        warn(msg: string): void;
        error(msg: string): void;
        child(filename: string): Logger;
        childWithName(name: string): Logger;
        private log;
        write(entry: LogEntry): void;
    }
    export const devNull: {
        write: (entry: LogEntry) => void;
    };
    export function multiSink(...sinks: LogSink[]): {
        write(entry: LogEntry): void;
    };
    export const streamSink: (stream: NodeJS.WritableStream) => LogSink;
    export class RecordingLogger extends Logger {
        memlog: memory.WritableStream;
        closed: boolean;
        constructor(parent: Logger, name?: string);
        /**
         * Returns all log messages as a string
         */
        getLog(): string;
        destroy(): void;
    }
    export const recordingLogger: (parent: Logger, name?: string) => RecordingLogger;
}
declare module "common/modals/types" {
    import { Game, PrereqStatus, Cave, Upload, Build } from "common/butlerd/messages";
    export interface TwoFactorInputParams {
        username: string;
    }
    export interface TwoFactorInputResponse {
        /** two-factor authentication code entered */
        totpCode?: string;
    }
    export interface ShowErrorParams {
        rawError: any;
        game?: Game;
        log: string;
        forceDetails?: boolean;
        showSendReport?: boolean;
    }
    export interface ShowErrorResponse {
        sendReport: boolean;
    }
    export interface SecretSettingsParams {
    }
    export interface SecretSettingsResponse {
    }
    export interface SendFeedbackParams {
        log?: string;
    }
    export interface SendFeedbackResponse {
    }
    export interface RecaptchaInputParams {
        url: string;
    }
    export interface RecaptchaInputResponse {
        recaptchaResponse: string;
    }
    export interface PrereqsStateParams {
        gameTitle: string;
        tasks: {
            [prereqName: string]: TaskProgressState;
        };
    }
    interface TaskProgressState {
        order: number;
        fullName: string;
        status: PrereqStatus;
        progress: number;
        eta: number;
        bps: number;
    }
    export interface PrereqsStateResponse {
    }
    export interface ManageGameParams {
        game: Game;
        caves: Cave[];
        allUploads: Upload[];
        loadingUploads: boolean;
    }
    export interface ManageGameResponse {
    }
    export interface ManageCaveParams {
        cave: Cave;
    }
    export interface ManageCaveResponse {
    }
    export interface PlanInstallParams {
        uploadId?: number;
        game: Game;
    }
    export interface PlanInstallResponse {
    }
    export interface ExploreJsonParams {
        data: any;
    }
    export interface ExploreJsonResponse {
    }
    export interface SwitchVersionCaveParams {
        cave: Cave;
        upload: Upload;
        builds: Build[];
    }
    export interface SwitchVersionCaveResponse {
        /** index of build to revert to (or negative to abort) */
        index?: number;
    }
    export interface ClearBrowsingDataParams {
    }
    export interface ClearBrowsingDataResponse {
        /** whether to clear cookies */
        cookies?: boolean;
        /** whether to clear cache */
        cache?: boolean;
    }
    export interface ConfirmQuitParams {
        gameIds: number[];
    }
    export interface ConfirmQuitResponse {
    }
}
declare module "common/types/errors" {
    type ItchErrorCode = "ITCH_ECANCELLED" | "ITCH_ERETRY";
    class ItchError extends Error {
        code: ItchErrorCode;
        constructor(code: ItchErrorCode);
        toString(): string;
    }
    export class Cancelled extends ItchError {
        detail: string;
        constructor(detail?: string);
    }
    export function isCancelled(e: any): boolean;
    export function isAborted(e: any): boolean;
    export class Retry extends ItchError {
        constructor(detail: string);
        toString(): string;
    }
    export function isRetry(e: any): boolean;
}
declare module "common/types/net" {
    export type HTTPMethod = "head" | "get" | "post" | "put" | "patch" | "delete";
    export type RequestFunc = (method: HTTPMethod, uri: string, data: any, opts?: RequestOpts) => Promise<Response>;
    export interface Headers {
        [key: string]: string[];
    }
    export interface Response {
        statusCode: number;
        status: string;
        body: any;
        size: number;
        headers: Headers;
    }
    interface RequestCallback {
        (res: Response): void;
    }
    export interface RequestOpts {
        sink?: () => NodeJS.WritableStream;
        cb?: RequestCallback;
        format?: "json" | null;
    }
}
declare module "common/types/index" {
    import { Store as ReduxStore } from "redux";
    export * from "common/types/errors";
    export * from "common/types/net";
    import { GameUpdate, Game, User, Collection, CaveSummary, DownloadKeySummary, Download, DownloadProgress, Platform, Profile } from "common/butlerd/messages";
    import { Endpoint } from "butlerd";
    import { modals } from "common/modals/index";
    export interface Store extends ReduxStore<RootState> {
    }
    export interface Dispatch {
        (action: Action<any>): void;
    }
    export interface Action<T extends Object> {
        type: string;
        payload?: T;
    }
    interface Watcher {
        addSub(sub: Watcher): void;
        removeSub(sub: Watcher): void;
    }
    export interface ChromeStore extends Store {
        watcher: Watcher;
    }
    export interface Dispatch {
        (a: Action<any>): void;
    }
    export type GenerosityLevel = "discreet";
    export type ClassificationAction = "launch" | "open";
    export interface UserSet {
        [id: string]: User;
    }
    export interface GameSet {
        [id: string]: Game;
    }
    export interface CollectionSet {
        [id: string]: Collection;
    }
    /**
     * The entire application state, following the redux philosophy
     */
    export interface RootState {
        system: SystemState;
        setup: SetupState;
        profile: ProfileState;
        winds: WindsState;
        i18n: I18nState;
        ui: UIState;
        preferences: PreferencesState;
        tasks: TasksState;
        downloads: DownloadsState;
        status: StatusState;
        gameUpdates: GameUpdatesState;
        /** commonly-needed subset of DB rows available in a compact & performance-friendly format */
        commons: CommonsState;
        systemTasks: SystemTasksState;
        broth: BrothState;
        butlerd: ButlerdState;
    }
    export interface BrothState {
        packageNames: string[];
        packages: PackagesState;
    }
    export interface PackagesState {
        [key: string]: PackageState;
    }
    export interface ButlerdState {
        startedAt: number;
        endpoint?: Endpoint;
    }
    export interface PackageState {
        stage: "assess" | "download" | "install" | "idle" | "need-restart";
        version?: string;
        versionPrefix?: string;
        progressInfo?: ProgressInfo;
        availableVersion?: string;
    }
    export interface CommonsState {
        downloadKeys: {
            [downloadKeyId: string]: DownloadKeySummary;
        };
        downloadKeyIdsByGameId: {
            [gameId: string]: string[];
        };
        caves: {
            [caveId: string]: CaveSummary;
        };
        caveIdsByGameId: {
            [gameId: string]: string[];
        };
        /** size on disk (in bytes) of each install location */
        locationSizes: {
            [id: string]: number;
        };
    }
    export interface GameUpdatesState {
        /** pending game updates */
        updates: {
            [caveId: string]: GameUpdate;
        };
        /** are we currently checking? */
        checking: boolean;
        /** check progress */
        progress: number;
    }
    export type ModalAction = Action<any> | Action<any>[];
    export interface ModalButton {
        /** HTML id for this button */
        id?: string;
        /** icomoon icon to use for button */
        icon?: string;
        /** text to show on button */
        label: LocalizedString;
        /** what should happen when clicking the button */
        action?: ModalAction | "widgetResponse";
        /** use this to specify custom CSS classes (which is both naughty and nice) */
        className?: string;
        /** Tags to tack after label */
        tags?: ModalButtonTag[];
        timeAgo?: {
            date: Date | string;
        };
        left?: boolean;
    }
    export interface ModalButtonTag {
        label?: LocalizedString;
        icon?: string;
    }
    export type ModalButtonSpec = ModalButton | "ok" | "cancel" | "nevermind";
    export interface ModalBase {
        /** window this modal belongs to */
        wind: string;
        /** generated identifier for this modal */
        id?: string;
        /** title of the modal */
        title: LocalizedString;
        /** main body of text */
        message?: LocalizedString;
        /** secondary body of text */
        detail?: LocalizedString;
        /** an image to show prominently in the modal */
        stillCoverUrl?: string;
        coverUrl?: string;
        /** main buttons (in list format) */
        bigButtons?: ModalButtonSpec[];
        /** secondary buttons */
        buttons?: ModalButtonSpec[];
        unclosable?: boolean;
        fullscreen?: boolean;
    }
    export interface Modal extends ModalBase {
        /** name of modal widget to render */
        widget?: keyof typeof modals;
        /** parameters to pass to React component */
        widgetParams?: {};
    }
    export interface ModalUpdate {
        /** the modal's unique identifier */
        id: string;
        /** the parameters for the widget being shown in the modal */
        widgetParams: any;
    }
    export type ModalsState = Modal[];
    export interface ItchAppTabs {
        /** id of current tab at time of snapshot */
        current: string;
        /** list of transient tabs when the snapshot was taken */
        items: TabDataSave[];
    }
    export type ProxySource = "os" | "env";
    export interface ProxySettings {
        /** if non-null, the proxy specified by the OS (as sniffed by Chromium) */
        proxy?: string;
        /** if non-null, where the proxy settings come from */
        proxySource?: ProxySource;
    }
    export interface SystemState {
        /** app name, like 'itch' or 'kitch' */
        appName: string;
        /** version string, for example '25.0.0' */
        appVersion: string;
        /** the platform string, in itch format */
        platform: Platform;
        /** 'ia32' or 'x64' */
        arch: string;
        /** true if running on macOS */
        macos: boolean;
        /** true if running on Windows */
        windows: boolean;
        /** true if running on GNU/Linux */
        linux: boolean;
        /** 2-letter language code sniffed from user's OS */
        sniffedLanguage?: string;
        /** path of ~ */
        homePath: string;
        /** ~/.config/itch, ~/Library/Application Data/itch, %APPDATA%/itch */
        userDataPath: string;
        /** if non-null, the proxy specified by the OS (as sniffed by Chromium) */
        proxy?: string;
        /** if non-null, where the proxy settings come from */
        proxySource?: ProxySource;
        /** true if we're about to quit */
        quitting?: boolean;
        /** true if we're currently scanning install locations */
        locationScanProgress?: number | null;
    }
    export interface SystemTasksState {
        /** timestamp for next components update check (milliseconds since epoch) */
        nextComponentsUpdateCheck: number;
        /** timestamp for next game update check (milliseconds since epoch) */
        nextGameUpdateCheck: number;
    }
    export interface SetupOperation {
        message: LocalizedString;
        icon: string;
        rawError?: Error;
        log?: string;
        stage?: string;
        progressInfo?: ProgressInfo;
    }
    export interface SetupState {
        done: boolean;
        errors: string[];
        blockingOperation: SetupOperation;
    }
    export interface ProfileState {
        /** collection freshness information */
        profile: Profile;
        login: ProfileLoginState;
        itchioUris: string[];
    }
    export interface WindsState {
        [wind: string]: WindState;
    }
    export interface WindState {
        navigation: NavigationState;
        modals: ModalsState;
        tabInstances: TabInstances;
        native: NativeWindowState;
        properties: WindPropertiesState;
    }
    export interface NativeWindowState {
        /** id of the electron BrowserWindow the window is displayed in */
        id: number;
        /** true if window has focus */
        focused: boolean;
        /** true if window is fullscreen */
        fullscreen: boolean;
        /** true if window is html-fullscreen */
        htmlFullscreen: boolean;
        /** true if window is maximized */
        maximized: boolean;
    }
    export interface ProfileLoginState {
        error?: Error;
        blockingOperation: SetupOperation;
        lastUsername?: string;
    }
    export type TabLayout = "grid" | "table";
    export interface NavigationState {
        /** opened tabs */
        openTabs: string[];
        /** current tab id */
        tab: string;
    }
    export interface WindPropertiesState {
        /** what the window was opened on */
        initialURL: string;
        /** the window's role */
        role: WindRole;
    }
    export interface I18nResourceSet {
        [lang: string]: I18nResources;
    }
    export interface I18nResources {
        [key: string]: string;
    }
    /** Info about a locale. See locales.json for a list that ships with the app. */
    export interface LocaleInfo {
        /** 2-letter language code */
        value: string;
        /** native name of language (English, Français, etc.) */
        label: string;
    }
    export interface I18nState {
        /** 2-letter code for the language the app is currently displayed in */
        lang: string;
        /** all translated strings */
        strings: I18nResourceSet;
        /** locales we'll download soon */
        queued: {
            [lang: string]: boolean;
        };
        /** locales we're downloading now */
        downloading: {
            [lang: string]: boolean;
        };
        locales: LocaleInfo[];
    }
    export interface UIMenuState {
        template: MenuTemplate;
    }
    export interface UIState {
        menu: UIMenuState;
        search: UISearchState;
    }
    export interface UISearchState {
        open: boolean;
    }
    export interface PreferencesState {
        /** is the app allowed to check for updates to itself? */
        downloadSelfUpdates: boolean;
        /** do not make any network requests */
        offlineMode: boolean;
        /**
         * DEPRECATED: this is just an import from <v23 itch.
         */
        installLocations: {
            [id: string]: string;
        };
        /**
         * where to install games by default
         */
        defaultInstallLocation: string;
        /** use sandbox */
        isolateApps: boolean;
        /** when closing window, keep running in tray */
        closeToTray: boolean;
        /** notify when a download has been installed or updated */
        readyNotification: boolean;
        /** show the advanced section of settings */
        showAdvanced: boolean;
        /** language picked by the user */
        lang: string;
        /** if true, user's already seen the 'minimize to tray' notification */
        gotMinimizeNotification: boolean;
        /** should the itch app start on os startup? */
        openAtLogin: boolean;
        /** when the itch app starts at login, should it be hidden? */
        openAsHidden: boolean;
        /** show consent dialog before applying any game updates */
        manualGameUpdates: boolean;
        /** prevent display sleep while playing */
        preventDisplaySleep: boolean;
        /** if rediff'd patch is available, use it instead of original patch */
        preferOptimizedPatches: boolean;
        /** layout to use to show games */
        layout: TabLayout;
        /** disable all webviews */
        disableBrowser: boolean;
        /** disable GPU acceleration, see #809 */
        disableHardwareAcceleration: boolean;
        /** enable tabs - if false, use simple interface */
        enableTabs: boolean;
        /** the last version of the app we've successfully run a setup of, see https://github.com/itchio/itch/issues/1997 */
        lastSuccessfulSetupVersion: string;
        /** whether or not we've already imported appdata as an install location */
        importedOldInstallLocations: boolean;
    }
    export interface Task {
        /** generated identifier */
        id: string;
        /** name of the task: install, uninstall, etc. */
        name: TaskName;
        /** progress in the [0, 1] interval */
        progress: number;
        /** id of the game this task is for (which game we're launching, etc.) */
        gameId: number;
        /** id of the cave this task is for */
        caveId: string;
        /** bytes per second at which task is being processed, if applicable */
        bps?: number;
        /** estimated time remaining for task, in seconds, if available */
        eta?: number;
    }
    export interface TasksState {
        /** all tasks currently going on in the app (installs, uninstalls, etc.) */
        tasks: {
            [key: string]: Task;
        };
        /** same as tasks, grouped by gameId - there may be multiple for the same game */
        tasksByGameId: {
            [gameId: string]: Task[];
        };
        /** all tasks finished and not cleared yet, since the app started */
        finishedTasks: Task[];
    }
    export interface DownloadsState {
        /** All the downloads we know about, indexed by their own id */
        items: {
            [id: string]: Download;
        };
        progresses: {
            [id: string]: DownloadProgress;
        };
        /** true if downloads are currently paused */
        paused: boolean;
        /** Download speeds, in bps, each item represents one second */
        speeds: number[];
    }
    type OpenAtLoginErrorCause = "no_desktop_file" | "error";
    /**
     * Something went wrong when applying
     */
    export interface OpenAtLoginError {
        /** why did applying the setting failed */
        cause: OpenAtLoginErrorCause;
        /** if cause is `error`, this is an error message */
        message?: string;
    }
    export interface StatusState {
        messages: LocalizedString[];
        openAtLoginError: OpenAtLoginError;
        reduxLoggingEnabled: boolean;
    }
    /**
     * Localized messages can be just a string, or an Array arranged like so:
     * [key: string, params: {[name: string]: string}]
     */
    export type LocalizedString = string | any[];
    export interface ProgressInfo {
        /** progress of the task between [0,1] */
        progress: number;
        /** current bytes per second */
        bps?: number;
        /** estimated time remaining, in seconds */
        eta?: number;
        stage?: string;
        doneBytes?: number;
        totalBytes?: number;
    }
    export interface ProgressListener {
        (info: ProgressInfo): void;
    }
    export interface Runtime {
        platform: Platform;
    }
    export interface MenuItem extends Electron.MenuItemConstructorOptions {
        localizedLabel?: LocalizedString;
        action?: Action<any>;
        submenu?: MenuItem[];
        id?: string;
    }
    export type MenuTemplate = MenuItem[];
    export interface NavigatePayload {
        /** which window initiated the navigation */
        wind: string;
        /** the url to navigate to */
        url: string;
        /** if we know this associates with a resource, let it be known here */
        resource?: string;
        /** whether to open a new tab in the background */
        background?: boolean;
        /** whether to replace the current history entry */
        replace?: boolean;
    }
    export interface OpenTabPayload extends NavigatePayload {
        wind: string;
        /** the id of the new tab to open (generated) */
        tab?: string;
    }
    export interface OpenContextMenuBase {
        /** which window to open the context menu for */
        wind: string;
        /** left coordinate, in pixels */
        clientX: number;
        /** top coordinate, in pixels */
        clientY: number;
    }
    interface EvolveBasePayload {
        /** which window the tab belongs to */
        wind: string;
        /** the tab to evolve */
        tab: string;
        /** the new URL */
        url: string;
        /** the new resource if any */
        resource?: string;
        /** the new label if any */
        label?: LocalizedString;
    }
    export interface EvolveTabPayload extends EvolveBasePayload {
        /** if false, that's a new history entry, if true it replaces the current one */
        replace: boolean;
        /** if true, will only set resource if the url is what we think it is */
        onlyIfMatchingURL?: boolean;
        fromWebContents?: boolean;
    }
    export interface NavigateTabPayload extends EvolveBasePayload {
        /** whether to open in the background */
        background: boolean;
    }
    export interface TabInstances {
        [key: string]: TabInstance;
    }
    export interface TabPage {
        /**
         * url of tab, something like:
         *   - itch://collections/:id
         *   - itch://games/:id
         *   - itch://preferences
         *   - https://google.com/
         *   - https://leafo.itch.io/x-moon
         */
        url: string;
        /**
         * resource associated with tab, something like
         *    - `games/:id`
         */
        resource?: string;
        /**
         * label/title for this page
         */
        label?: LocalizedString;
        /**
         * favicon for this page
         */
        favicon?: string;
        /**
         * current scroll value
         */
        scrollTop?: number;
        /**
         * restored scroll value. This only changes when navigating backward/forward
         * through the history, and can be safely used by components to implement scroll
         * history.
         */
        restoredScrollTop?: number;
    }
    export interface TabInstance {
        /** pages visited in this tab */
        history: TabPage[];
        /** current index of history shown */
        currentIndex: number;
        /** whether the tab is currently loading */
        loading?: boolean;
        /** if sleepy, don't load until it's focused */
        sleepy?: boolean;
        /** label we had when saving the tab */
        savedLabel?: LocalizedString;
        /** number that increments when we reload a tab */
        sequence: number;
        /** derived properties related to the current URL */
        location?: TabInstanceLocation;
        /** derived properties related to the current resource */
        resource?: TabInstanceResource;
        /** derived properties related to history, etc. */
        status?: TabInstanceStatus;
    }
    export interface TabInstanceLocation {
        /** current URL of the tab */
        url: string;
        /** "https:", "itch:", etc. */
        protocol: string;
        /** "new-tab", "applog", etc. */
        internalPage: string;
        /** in "itch://games/3", "3" as string */
        firstPathElement: string;
        /** in "itch://caves/:caveId/launch", "launch" as string */
        secondPathElement: string;
        /** in "itch://games/3", 3 as number */
        firstPathNumber: number;
        /** in "itch://games/3", "games" */
        hostname: string;
        /** in "itch://games/3", "/3" */
        pathname: string;
        /** for "https://example.com?a=b&c=d", {"a":"b", "c":"d"} */
        query: QueryParams;
        /** should the the tab shown in a browser view? */
        isBrowser: boolean;
    }
    export interface QueryParams {
        [key: string]: string;
    }
    export interface TabInstanceResource {
        /** for resource "games/3", "games" */
        prefix?: string;
        /** for resource "games/3", "3" */
        suffix?: string;
        /** for resource "games/3", "" */
        numericId?: number;
        /** the entire resource */
        value?: string;
    }
    export interface TabInstanceStatus {
        /** true if we can navigate back */
        canGoBack: boolean;
        /** true if we can navigate forward */
        canGoForward: boolean;
        /** current favicon of the tab */
        favicon: string;
        /** current icon of the tab */
        icon?: string;
        /** current label, maybe empty if we've just navigated */
        label?: LocalizedString;
        /** if we're loading a new page, this has the previous page's label */
        lazyLabel?: LocalizedString;
    }
    export interface TabDataSave {
        /** id of the tab */
        id: string;
        /** pages visited in this tab */
        history: TabPage[];
        /** current index of history shown */
        currentIndex: number;
    }
    export type TaskName = "install-queue" | "install" | "uninstall" | "launch";
    export type AutoUpdaterStart = () => Promise<boolean>;
    export interface ExtendedWindow extends Window {
        windSpec: WindSpec;
    }
    export interface WindSpec {
        wind: string;
        role: WindRole;
    }
    export type WindRole = "main" | "secondary";
    export type Subtract<T, K> = Omit<T, keyof K>;
}
declare module "common/util/uuid" {
    function v4(): string;
    export default v4;
}
declare module "common/modals/index" {
    import { ClearBrowsingDataParams, ClearBrowsingDataResponse, ExploreJsonParams, ExploreJsonResponse, ManageCaveParams, ManageCaveResponse, ManageGameParams, ManageGameResponse, PlanInstallParams, PlanInstallResponse, PrereqsStateParams, PrereqsStateResponse, RecaptchaInputParams, RecaptchaInputResponse, SecretSettingsParams, SecretSettingsResponse, SendFeedbackParams, ShowErrorParams, ShowErrorResponse, SwitchVersionCaveParams, SwitchVersionCaveResponse, TwoFactorInputParams, TwoFactorInputResponse, ConfirmQuitParams, ConfirmQuitResponse } from "common/modals/types";
    import { Action, Modal, ModalBase, ModalUpdate } from "common/types/index";
    interface TypedModalBase<Params> extends ModalBase {
        widgetParams: Params;
    }
    export interface TypedModal<Params extends {} | undefined, Response> extends Modal {
        widgetParams: Params;
        widget?: any;
        __response: Response;
    }
    interface TypedModalUpdateBase<Params> extends ModalUpdate {
        widgetParams: Partial<Params>;
    }
    export interface TypedModalUpdate<Params> extends TypedModalUpdateBase<Params> {
        __params: Params;
    }
    export type ModalWidgetSpec<Params extends {} | undefined, Response> = {
        params?: Params;
        response?: Response;
        key: string;
        action: (response: Response) => Action<any>;
        make: (base: TypedModalBase<Params>) => TypedModal<Params, Response>;
        update: (update: TypedModalUpdateBase<Params>) => TypedModalUpdate<Params>;
    };
    export type ModalWidgetProps<Params extends {} | undefined, Response> = {
        modal: TypedModal<Params, Response>;
        updatePayload: (response: Response) => void;
    };
    export const modals: {
        clearBrowsingData: ModalWidgetSpec<ClearBrowsingDataParams, ClearBrowsingDataResponse>;
        exploreJson: ModalWidgetSpec<ExploreJsonParams, ExploreJsonResponse>;
        manageGame: ModalWidgetSpec<ManageGameParams, ManageGameResponse>;
        manageCave: ModalWidgetSpec<ManageCaveParams, ManageCaveResponse>;
        planInstall: ModalWidgetSpec<PlanInstallParams, PlanInstallResponse>;
        prereqsState: ModalWidgetSpec<PrereqsStateParams, PrereqsStateResponse>;
        recaptchaInput: ModalWidgetSpec<RecaptchaInputParams, RecaptchaInputResponse>;
        switchVersionCave: ModalWidgetSpec<SwitchVersionCaveParams, SwitchVersionCaveResponse>;
        secretSettings: ModalWidgetSpec<SecretSettingsParams, SecretSettingsResponse>;
        showError: ModalWidgetSpec<ShowErrorParams, ShowErrorResponse>;
        twoFactorInput: ModalWidgetSpec<TwoFactorInputParams, TwoFactorInputResponse>;
        sendFeedback: ModalWidgetSpec<SendFeedbackParams, void>;
        pickUpload: ModalWidgetSpec<{}, {
            /** manually picked upload for install */
            pickedUploadIndex?: number;
        }>;
        pickManifestAction: ModalWidgetSpec<{}, {
            /** index of the manifest action that was picked when launching a game */
            index: number;
        }>;
        sandboxBlessing: ModalWidgetSpec<{}, {
            /** whether or not to install the sandbox */
            sandboxBlessing?: boolean;
        }>;
        adminWipeBlessing: ModalWidgetSpec<{}, {}>;
        naked: ModalWidgetSpec<{}, {}>;
        confirmQuit: ModalWidgetSpec<ConfirmQuitParams, ConfirmQuitResponse>;
    };
}
declare module "common/actions/index" {
    import { Endpoint } from "butlerd";
    import { Cave, CleanDownloadsEntry, Download, DownloadProgress, Game, GameUpdate, GameUpdateChoice, Profile } from "common/butlerd/messages";
    import { LogEntry } from "common/logger/index";
    import { TypedModal, TypedModalUpdate } from "common/modals/index";
    import { Action, CommonsState, Dispatch, EvolveTabPayload, GenerosityLevel, I18nResources, I18nResourceSet, ItchAppTabs, LocalizedString, MenuTemplate, ModalAction, NavigatePayload, NavigateTabPayload, OpenAtLoginError, OpenContextMenuBase, OpenTabPayload, PackageState, PreferencesState, ProgressInfo, ProxySource, SystemState, SystemTasksState, TabPage, TaskName, WindRole } from "common/types/index";
    export interface ActionCreator<PayloadType extends Object> {
        payload: PayloadType;
        (payload: PayloadType): Action<PayloadType>;
    }
    export function dispatcher<T, U extends Object>(dispatch: Dispatch, actionCreator: (payload: T) => Action<U>): (payload: T) => Action<U>;
    type MirrorOutput<T> = {
        [key in keyof T]: T[key];
    };
    export const actions: MirrorOutput<{
        preboot: ActionCreator<{}>;
        prebootDone: ActionCreator<{}>;
        rootWindowReady: ActionCreator<{}>;
        boot: ActionCreator<{}>;
        tick: ActionCreator<{}>;
        log: ActionCreator<{
            entry: LogEntry;
        }>;
        scheduleSystemTask: ActionCreator<Partial<SystemTasksState>>;
        systemAssessed: ActionCreator<{
            system: SystemState;
        }>;
        languageChanged: ActionCreator<{
            lang: string;
        }>;
        processUrlArguments: ActionCreator<{
            /** these are command-line arguments */
            args: string[];
        }>;
        handleItchioURI: ActionCreator<{
            /** example: itchio:///games/3 */
            uri: string;
        }>;
        pushItchioURI: ActionCreator<{
            uri: string;
        }>;
        clearItchioURIs: ActionCreator<{}>;
        proxySettingsDetected: ActionCreator<{
            /** a valid HTTP(S) proxy string (that could be in $HTTP_PROXY) */
            proxy: string;
            source: ProxySource;
        }>;
        commonsUpdated: ActionCreator<Partial<CommonsState>>;
        openModal: ActionCreator<TypedModal<any, any>>;
        updateModalWidgetParams: ActionCreator<TypedModalUpdate<any>>;
        closeModal: ActionCreator<{
            wind: string;
            /** id of the modal to close - if unspecified, close frontmost */
            id?: string;
            /** action that should be dispatched once the modal's been closed */
            action?: ModalAction;
        }>;
        modalClosed: ActionCreator<{
            wind: string;
            /** id of the modal that was just closed */
            id: string;
            /** if there was a response, it's here */
            response: any;
        }>;
        modalResponse: ActionCreator<any>;
        openWind: ActionCreator<{
            initialURL: string;
            role: WindRole;
        }>;
        closeWind: ActionCreator<{
            wind: string;
        }>;
        windClosed: ActionCreator<{
            wind: string;
        }>;
        windOpened: ActionCreator<{
            wind: string;
            nativeId: number;
            initialURL: string;
            role: WindRole;
        }>;
        packagesListed: ActionCreator<{
            packageNames: string[];
        }>;
        packageGotVersionPrefix: ActionCreator<{
            name: string;
            version: string;
            versionPrefix: string;
        }>;
        packageStage: ActionCreator<{
            name: string;
            stage: PackageState["stage"];
        }>;
        packageNeedRestart: ActionCreator<{
            name: string;
            availableVersion: string;
        }>;
        packageProgress: ActionCreator<{
            name: string;
            progressInfo: ProgressInfo;
        }>;
        relaunchRequest: ActionCreator<{}>;
        relaunch: ActionCreator<{}>;
        spinningUpButlerd: ActionCreator<{
            startedAt: number;
        }>;
        gotButlerdEndpoint: ActionCreator<{
            endpoint: Endpoint;
        }>;
        setupStatus: ActionCreator<{
            icon: string;
            message: LocalizedString;
            rawError?: Error;
            log?: string;
        }>;
        setupOperationProgress: ActionCreator<{
            progress: ProgressInfo;
        }>;
        setupDone: ActionCreator<{}>;
        silentlyScanInstallLocations: ActionCreator<{}>;
        locationScanProgress: ActionCreator<{
            progress: number;
        }>;
        locationScanDone: ActionCreator<{}>;
        retrySetup: ActionCreator<{}>;
        attemptLogin: ActionCreator<{}>;
        loginWithPassword: ActionCreator<{
            /** the username or e-mail for the itch.io account to log in as */
            username: string;
            /** the password for the itch.io account to log in as */
            password: string;
            /** the 2FA totp code entered by user */
            totpCode?: string;
        }>;
        useSavedLogin: ActionCreator<{
            profile: Profile;
        }>;
        loginFailed: ActionCreator<{
            /** the username we couldn't log in as (useful to prefill login form for retry) */
            username: string;
            /** an error that occured while logging in */
            error: Error;
        }>;
        loginCancelled: ActionCreator<{}>;
        loginSucceeded: ActionCreator<{
            /** Profile we just logged in as */
            profile: Profile;
        }>;
        forgetProfileRequest: ActionCreator<{
            /** Profile to forget */
            profile: Profile;
        }>;
        forgetProfile: ActionCreator<{
            /** Profile to forget */
            profile: Profile;
        }>;
        profilesUpdated: ActionCreator<{}>;
        changeUser: ActionCreator<{}>;
        requestLogout: ActionCreator<{}>;
        loggedOut: ActionCreator<{}>;
        startOnboarding: ActionCreator<{}>;
        exitOnboarding: ActionCreator<{}>;
        windDestroyed: ActionCreator<{
            wind: string;
        }>;
        windFocusChanged: ActionCreator<{
            wind: string;
            /** current state of focusedness */
            focused: boolean;
        }>;
        windFullscreenChanged: ActionCreator<{
            wind: string;
            /** current state of fullscreenedness */
            fullscreen: boolean;
        }>;
        windHtmlFullscreenChanged: ActionCreator<{
            wind: string;
            /** current state of html-fullscreenedness */
            htmlFullscreen: boolean;
        }>;
        windMaximizedChanged: ActionCreator<{
            wind: string;
            /** current state of fullscreenedness */
            maximized: boolean;
        }>;
        windBoundsChanged: ActionCreator<{
            wind: string;
            bounds: {
                /** left border, in pixels */
                x: number;
                /** top border, in pixels */
                y: number;
                /** in pixels */
                width: number;
                /** in pixels */
                height: number;
            };
        }>;
        focusWind: ActionCreator<{
            wind: string;
            /** if set to true, toggle focus instead of always focusing */
            toggle?: boolean;
        }>;
        hideWind: ActionCreator<{
            wind: string;
        }>;
        minimizeWind: ActionCreator<{
            wind: string;
        }>;
        toggleMaximizeWind: ActionCreator<{
            wind: string;
        }>;
        tabOpened: ActionCreator<OpenTabPayload>;
        newTab: ActionCreator<{
            wind: string;
        }>;
        navigate: ActionCreator<NavigatePayload>;
        tabFocused: ActionCreator<{
            wind: string;
            /** the id of the new tab */
            tab: string;
        }>;
        focusNthTab: ActionCreator<{
            wind: string;
            /** the index of the constant tab to focus (0-based) */
            index: number;
        }>;
        moveTab: ActionCreator<{
            wind: string;
            /** old tab index */
            before: number;
            /** new tab index */
            after: number;
        }>;
        showNextTab: ActionCreator<{
            wind: string;
        }>;
        showPreviousTab: ActionCreator<{
            wind: string;
        }>;
        closeTab: ActionCreator<{
            wind: string;
            /** id of tab to close */
            tab: string;
        }>;
        closeCurrentTab: ActionCreator<{
            wind: string;
        }>;
        closeTabOrAuxWindow: ActionCreator<{
            wind: string;
        }>;
        closeAllTabs: ActionCreator<{
            wind: string;
        }>;
        closeOtherTabs: ActionCreator<{
            wind: string;
            /** the only transient tab that'll be left */
            tab: string;
        }>;
        closeTabsBelow: ActionCreator<{
            wind: string;
            /** the tab after which all tabs will be closed */
            tab: string;
        }>;
        tabsClosed: ActionCreator<{
            wind: string;
            tabs: string[];
            andFocus?: string;
        }>;
        navigateTab: ActionCreator<NavigateTabPayload>;
        evolveTab: ActionCreator<EvolveTabPayload>;
        tabReloaded: ActionCreator<{
            wind: string;
            /** the tab that just reloaded */
            tab: string;
        }>;
        tabChanged: ActionCreator<{
            wind: string;
            /** the newly active tab */
            tab: string;
        }>;
        tabsChanged: ActionCreator<{
            wind: string;
        }>;
        tabsRestored: ActionCreator<{
            wind: string;
            snapshot: ItchAppTabs;
        }>;
        tabPageUpdate: ActionCreator<{
            wind: string;
            /** tab for which we fetched data */
            tab: string;
            /** the data we fetched */
            page: Partial<TabPage>;
        }>;
        tabLoadingStateChanged: ActionCreator<{
            wind: string;
            tab: string;
            loading: boolean;
        }>;
        analyzePage: ActionCreator<{
            wind: string;
            /** Which tab we're analyzing the page for */
            tab: string;
            /** The url we're supposed to analyze */
            url: string;
        }>;
        tabGotWebContents: ActionCreator<{
            wind: string;
            /** id of tab that just got a webcontents */
            tab: string;
            webContentsId: number;
        }>;
        tabLosingWebContents: ActionCreator<{
            wind: string;
            /** id of tab that just lost a webcontents */
            tab: string;
        }>;
        openTabBackHistory: ActionCreator<OpenContextMenuBase & {
            tab: string;
        }>;
        openTabForwardHistory: ActionCreator<OpenContextMenuBase & {
            tab: string;
        }>;
        openGameContextMenu: ActionCreator<OpenContextMenuBase & {
            /** game to open the context menu of */
            game: Game;
        }>;
        openUserMenu: ActionCreator<OpenContextMenuBase>;
        viewCreatorProfile: ActionCreator<{}>;
        viewCommunityProfile: ActionCreator<{}>;
        menuChanged: ActionCreator<{
            /** new menu template */
            template: MenuTemplate;
        }>;
        popupContextMenu: ActionCreator<OpenContextMenuBase & {
            /** contents of the context menu */
            template: MenuTemplate;
        }>;
        closeContextMenu: ActionCreator<{
            wind: string;
        }>;
        checkForComponentUpdates: ActionCreator<{}>;
        beforeQuit: ActionCreator<{}>;
        cancelQuit: ActionCreator<{}>;
        quit: ActionCreator<{}>;
        performQuit: ActionCreator<{}>;
        quitWhenMain: ActionCreator<{}>;
        localesConfigLoaded: ActionCreator<{
            /** initial set of i18n strings */
            strings: I18nResourceSet;
        }>;
        queueLocaleDownload: ActionCreator<{
            /** language to download */
            lang: string;
            /** true if not triggered manually */
            implicit?: boolean;
        }>;
        localeDownloadStarted: ActionCreator<{
            /** which language just started downloading */
            lang: string;
        }>;
        localeDownloadEnded: ActionCreator<{
            /** which language just finished downloading */
            lang: string;
            /** i18n strings */
            resources: I18nResources;
        }>;
        reloadLocales: ActionCreator<{}>;
        browseInstallLocation: ActionCreator<{
            /** id of install location to browse */
            id: string;
        }>;
        addInstallLocation: ActionCreator<{
            wind: string;
        }>;
        removeInstallLocation: ActionCreator<{
            /** id of the install location to remove */
            id: string;
        }>;
        makeInstallLocationDefault: ActionCreator<{
            /** id of install location to make the default */
            id: string;
        }>;
        scanInstallLocations: ActionCreator<{}>;
        newItemsImported: ActionCreator<{}>;
        installLocationsChanged: ActionCreator<{}>;
        ownedKeysFetched: ActionCreator<{}>;
        taskStarted: ActionCreator<{
            /** name of task that just started */
            name: TaskName;
            /** identifier of the task that just started */
            id: string;
            /** timestamp for the task's start */
            startedAt: number;
            /** identifier of the game the task is tied to */
            gameId: number;
            /** identifier of the cave the task is tied to */
            caveId: string;
        }>;
        taskProgress: ActionCreator<ProgressInfo & {
            /** the task this progress info is for */
            id: string;
        }>;
        taskEnded: ActionCreator<{
            /** the task that just ended */
            id: string;
            /** an error, if any */
            err: string;
        }>;
        abortTask: ActionCreator<{
            /** id of the task to abort */
            id: string;
        }>;
        downloadQueued: ActionCreator<{}>;
        downloadsListed: ActionCreator<{
            downloads: Download[];
        }>;
        refreshDownloads: ActionCreator<{}>;
        downloadProgress: ActionCreator<{
            download: Download;
            progress: DownloadProgress;
            speedHistory: number[];
        }>;
        downloadEnded: ActionCreator<{
            download: Download;
        }>;
        clearFinishedDownloads: ActionCreator<{}>;
        prioritizeDownload: ActionCreator<{
            /** the download for which we want to show an error dialog */
            id: string;
        }>;
        showDownloadError: ActionCreator<{
            /** the download for which we want to show an error dialog */
            id: string;
        }>;
        discardDownload: ActionCreator<{
            /** id of download to discard */
            id: string;
        }>;
        downloadDiscarded: ActionCreator<{
            /** id of download that was just discarded */
            id: string;
        }>;
        setDownloadsPaused: ActionCreator<{
            paused: boolean;
        }>;
        retryDownload: ActionCreator<{
            /** id of download to retry */
            id: string;
        }>;
        clearGameDownloads: ActionCreator<{
            /** id of game for which to clear downloads */
            gameId: number;
        }>;
        downloadsRestored: ActionCreator<{}>;
        cleanDownloadsSearch: ActionCreator<{}>;
        cleanDownloadsFoundEntries: ActionCreator<{
            /** download subfolders we could remove */
            entries: CleanDownloadsEntry[];
        }>;
        cleanDownloadsApply: ActionCreator<{
            /** download subfolders we will remove */
            entries: CleanDownloadsEntry[];
        }>;
        queueGame: ActionCreator<{
            /** the game we want to download */
            game: Game;
            /** which cave to launch */
            caveId?: string;
        }>;
        queueGameInstall: ActionCreator<{
            /** the game we want to install */
            game: Game;
            /** the upload we picked */
            uploadId?: number;
        }>;
        queueLaunch: ActionCreator<{
            cave: Cave;
        }>;
        launchEnded: ActionCreator<{}>;
        manageGame: ActionCreator<{
            /** which game to manage */
            game: Game;
        }>;
        manageCave: ActionCreator<{
            /** which cave to manage */
            caveId: string;
        }>;
        requestCaveUninstall: ActionCreator<{
            /** id of the cave to uninstall */
            caveId: string;
        }>;
        queueCaveUninstall: ActionCreator<{
            /** id of the cave to uninstall */
            caveId: string;
        }>;
        queueCaveReinstall: ActionCreator<{
            /** id of the cave to reinstall */
            caveId: string;
        }>;
        uninstallEnded: ActionCreator<{}>;
        exploreCave: ActionCreator<{
            /** id of the cave to explore */
            caveId: string;
        }>;
        recordGameInteraction: ActionCreator<{}>;
        forceCloseLastGame: ActionCreator<{}>;
        forceCloseGameRequest: ActionCreator<{
            /** the game we want to force-quit */
            game: Game;
        }>;
        forceCloseGame: ActionCreator<{
            /** the id of the game we want to force-quit */
            gameId: number;
        }>;
        checkForGameUpdates: ActionCreator<{}>;
        checkForGameUpdate: ActionCreator<{
            /** which cave to check for an update */
            caveId: string;
        }>;
        gameUpdateCheckStatus: ActionCreator<{
            /** whether we're currently checking */
            checking: boolean;
            /** how far along we are */
            progress: number;
        }>;
        gameUpdateAvailable: ActionCreator<{
            /** the actual update info */
            update: GameUpdate;
        }>;
        showGameUpdate: ActionCreator<{
            /** the actual update info */
            update: GameUpdate;
        }>;
        queueGameUpdate: ActionCreator<{
            /** the actual update info */
            update: GameUpdate;
            /** the choice we made */
            choice: GameUpdateChoice;
        }>;
        queueAllGameUpdates: ActionCreator<{}>;
        snoozeCave: ActionCreator<{
            caveId: string;
        }>;
        switchVersionCaveRequest: ActionCreator<{
            /** the cave to revert to a different build */
            cave: Cave;
        }>;
        viewCaveDetails: ActionCreator<{
            /** the cave to view details of */
            caveId: string;
        }>;
        initiatePurchase: ActionCreator<{
            /** the game that might be purchased */
            game: Game;
        }>;
        purchaseCompleted: ActionCreator<{
            /** the game that was just purchased */
            game: Game;
        }>;
        encourageGenerosity: ActionCreator<{
            /** for which game should we encourage generosity? */
            gameId: number;
            /** how hard should we encourage generosity? */
            level: GenerosityLevel;
        }>;
        focusInPageSearch: ActionCreator<{
            wind: string;
        }>;
        searchFetched: ActionCreator<{}>;
        focusSearch: ActionCreator<{}>;
        closeSearch: ActionCreator<{}>;
        focusLocationBar: ActionCreator<{
            wind: string;
            tab: string;
        }>;
        blurLocationBar: ActionCreator<{}>;
        searchVisibilityChanged: ActionCreator<{
            open: boolean;
        }>;
        updatePreferences: ActionCreator<Partial<PreferencesState>>;
        preferencesLoaded: ActionCreator<PreferencesState>;
        clearBrowsingDataRequest: ActionCreator<{
            wind: string;
        }>;
        clearBrowsingData: ActionCreator<{
            /** Whether to wipe cached images & files */
            cache: boolean;
            /** Whether to wipe cookies (will log out user) */
            cookies: boolean;
        }>;
        openAtLoginError: ActionCreator<OpenAtLoginError>;
        setReduxLoggingEnabled: ActionCreator<{
            /** true if should show in the chrome console */
            enabled: boolean;
        }>;
        gcDatabase: ActionCreator<{}>;
        /** macOS-only, bounce dock */
        bounce: ActionCreator<{}>;
        /** cross-platform, notification bubble */
        notify: ActionCreator<{
            /** title of the notification, defaults to `itch` */
            title?: string;
            /** main text of the notification */
            body: string;
            /** path to the icon (on fs, can be relative to `app/`), defaults to itch icon */
            icon?: string;
            /** action to dispatch if notification is clicked */
            onClick?: Action<any>;
        }>;
        statusMessage: ActionCreator<{
            /** the message we want to show in the status bar */
            message: LocalizedString;
        }>;
        dismissStatusMessage: ActionCreator<{}>;
        commandMain: ActionCreator<{
            wind: string;
        }>;
        commandOk: ActionCreator<{
            wind: string;
        }>;
        commandBack: ActionCreator<{
            wind: string;
        }>;
        commandGoBack: ActionCreator<{
            wind: string;
        }>;
        commandGoForward: ActionCreator<{
            wind: string;
        }>;
        commandLocation: ActionCreator<{
            wind: string;
        }>;
        commandReload: ActionCreator<{
            wind: string;
        }>;
        commandStop: ActionCreator<{
            wind: string;
        }>;
        tabGoBack: ActionCreator<{
            wind: string;
            tab: string;
        }>;
        tabGoForward: ActionCreator<{
            wind: string;
            tab: string;
        }>;
        tabGoToIndex: ActionCreator<{
            wind: string;
            tab: string;
            index: number;
        }>;
        tabWentToIndex: ActionCreator<{
            wind: string;
            tab: string;
            oldIndex: number;
            index: number;
            fromWebContents?: boolean;
        }>;
        tabStop: ActionCreator<{
            wind: string;
            tab: string;
        }>;
        openInExternalBrowser: ActionCreator<{
            /** the URL to open in an external web browser */
            url: string;
        }>;
        openAppLog: ActionCreator<{}>;
        openLogFileRequest: ActionCreator<{}>;
        openDevTools: ActionCreator<{
            wind: string;
            /** if specified, opens devTools for a tab, not the app */
            tab?: string;
        }>;
        inspect: ActionCreator<{
            webContentsId: number;
            x: number;
            y: number;
        }>;
        sendFeedback: ActionCreator<{
            /** error log that should be included in the issue report */
            log?: string;
        }>;
        viewChangelog: ActionCreator<{}>;
        copyToClipboard: ActionCreator<{
            /** text to copy to clipboard */
            text: string;
        }>;
    }>;
}
declare module "main/context/index" {
    import { Store, ProgressInfo, ProgressListener } from "common/types/index";
    interface Stopper {
        (): Promise<void>;
    }
    interface AbortListener {
        (): void;
    }
    type Work<T> = () => Promise<T>;
    interface WithStopperOpts<T> {
        stop: Stopper;
        work: Work<T>;
    }
    export class MinimalContext {
        private emitter;
        private stoppers;
        private dead;
        private cancelPromise;
        private resolveCancelPromise;
        private taskId;
        constructor();
        clone(): MinimalContext;
        /**
         * Try to abort this whole context. If it can't, it'll throw.
         */
        tryAbort(): Promise<void>;
        /**
         * Do some work that can be cancelled (launching a progress,
         * downloading something, etc.)
         */
        withStopper<T>(opts: WithStopperOpts<T>): Promise<T>;
        registerTaskId(taskId: string): void;
        getTaskId(): string;
        withSub<T, U extends MinimalContext>(this: U, f: (sub: U) => Promise<T>): Promise<T>;
        on(ev: "abort", listener: AbortListener): void;
        on(ev: "progress", listener: ProgressListener): void;
        on(ev: string, listener: (data: any) => void): void;
        emit(ev: string, data: any): void;
        emitProgress(progress: ProgressInfo): void;
        isDead(): boolean;
    }
    export class Context extends MinimalContext {
        store: Store;
        constructor(store: Store);
        clone(): Context;
    }
}
declare module "main/reactors/delay" {
    /** returns a promise that resolves after 'ms' milliseconds */
    export function delay(ms: number): Promise<unknown>;
}
declare module "common/format/datetime" {
    interface FormattedDuration {
        id: string;
        values?: {
            [key: string]: string;
        };
    }
    export function formatDurationAsMessage(secs: number): FormattedDuration;
    export interface DateFormat {
        key: number;
        options: Intl.DateTimeFormatOptions;
    }
    /**
     * Format a date for humans in the given locale
     */
    export function formatDate(date: Date, locale: string, format: DateFormat): string;
    export function getFormatter(format: DateFormat, locale: string): Intl.DateTimeFormat;
    export const DATE_FORMAT: DateFormat;
    export const MONTH_YEAR_FORMAT: DateFormat;
    export const DAY_MONTH_FORMAT: DateFormat;
    export function elapsed(t1: number, t2: number): string;
}
declare module "common/butlerd/utils" {
    import { RequestCreator, RequestError, Conversation } from "butlerd";
    import { Logger } from "common/logger/index";
    import { MinimalContext } from "main/context/index";
    import { Cave, CaveSummary } from "common/butlerd/messages";
    import { Store } from "common/types/index";
    export type SetupFunc = (convo: Conversation) => void;
    export function call<Params, Res>(store: Store, logger: Logger, rc: RequestCreator<Params, Res>, params: Params, setup?: SetupFunc): Promise<Res>;
    export function hookProgress(convo: Conversation, ctx: MinimalContext): void;
    export function hookLogging(convo: Conversation, logger: Logger): void;
    export function getCaveSummary(cave: Cave): CaveSummary;
    export function getErrorMessage(e: any): string;
    export function isInternalError(e: any): boolean;
    export function getErrorStack(e: any): string;
    export function mergeLogAndError(log: string, e: any): string;
    export function asRequestError(e: Error): RequestError;
    export function getRpcErrorData(e: Error): RequestError["rpcError"]["data"];
}
declare module "common/butlerd/index" {
    export * from "common/butlerd/utils";
    import * as _messages from "common/butlerd/messages";
    export const messages: typeof _messages;
}
declare module "common/constants/urls" {
    export const ITCH_URL_RE: RegExp;
    const _default_1: {
        itchRepo: string;
        originalItchio: string;
        itchio: string;
        appHomepage: string;
        itchTranslationPlatform: string;
        brothRepo: string;
        remoteLocalePath: string;
        manual: string;
        itchioApi: string;
        termsOfService: string;
        twoFactorHelp: string;
        accountRegister: string;
        accountForgotPassword: string;
        developersLearnMore: string;
        dashboard: string;
        myCollections: string;
        sandboxDocs: string;
        proxyDocs: string;
        linuxSandboxSetup: string;
        windowsSandboxSetup: string;
        releasesPage: string;
        installingOnLinux: string;
        windowsAntivirus: string;
    };
    export default _default_1;
}
declare module "common/util/paths" {
    export function usersPath(): string;
    export function fsFriendlyHost(url: string): string;
    export function preferencesPath(): string;
    export function butlerDbPath(): string;
    export function prereqsPath(): string;
    export function appdataLocationPath(): string;
    export function mainLogPath(): string;
    export function relaunchLogPath(): string;
    export function legacyMarketPath(): string;
    export function sanitize(file: string): string;
    export enum PathScheme {
        LEGACY_PER_USER = 1,
        MODERN_SHARED = 2
    }
}
declare module "common/constants/net" {
    export const NET_PARTITION_NAME = "itch-zone";
    export const NET_TIMEOUT_MS: number;
}
declare module "common/constants/useragent" {
    export function userAgent(): string;
    export function butlerUserAgent(): string;
}
declare module "common/butlerd/make-butler-instance" {
    import { Instance } from "butlerd";
    import { RootState } from "common/types/index";
    import { MinimalContext } from "main/context/index";
    interface ButlerInstanceOpts {
        rs?: RootState;
        versionPrefix?: string;
        ctx?: MinimalContext;
    }
    export function makeButlerInstance(opts: ButlerInstanceOpts): Promise<Instance>;
}
declare module "common/constants/classification-actions" {
    import { ClassificationAction } from "common/types/index";
    interface ClassificationActions {
        [key: string]: ClassificationAction;
    }
    export const classificationActions: ClassificationActions;
}
declare module "common/constants/colors" {
    export const codGray = "#141414";
    export const darkMineShaft = "#2E2B2C";
    export const lightMineShaft = "#383434";
    export const spooky = "#ff713e";
    export const spookyLight = "#ff9c6d";
    export const carnation = "#fa5c5c";
    export const vividTangerine = "#ff8080";
}
declare module "common/constants/default-manifest-icons" {
    interface ManifestIcons {
        [key: string]: string;
    }
    const _default_2: ManifestIcons;
    export default _default_2;
}
declare module "common/helpers/app" {
    export function getAppPath(): string;
    export function getVersion(): string;
}
declare module "common/util/resources" {
    export function getImagePath(path: string): string;
    export function getImageURL(path: string): string;
    export function getLocalePath(path: string): string;
    export function getLocalesConfigPath(): string;
    type InjectName = "itchio" | "game" | "captcha";
    export function getInjectPath(name: InjectName): string;
    export function getInjectURL(name: InjectName): string;
    export function getRendererFilePath(name: string): string;
}
declare module "common/constants/get-user-cover-url" {
    import { User } from "common/butlerd/messages";
    export function getUserCoverURL(user: User): string;
}
declare module "common/constants/platform-data" {
    import { Architectures } from "common/butlerd/messages";
    interface PlatformData {
        icon: string;
        platform: string;
        emoji: string;
    }
    interface PlatformDataMap {
        windows: PlatformData;
        linux: PlatformData;
        osx: PlatformData;
        [key: string]: PlatformData;
    }
    const data: PlatformDataMap;
    export default data;
    export type PlatformHolder = {
        platforms: {
            windows: Architectures;
            linux: Architectures;
            osx: Architectures;
        };
        type: "html" | any;
    };
    export function hasPlatforms(target: PlatformHolder): boolean;
}
declare module "common/constants/search-examples" {
    const _default_3: string[];
    export default _default_3;
}
declare module "common/constants/windows" {
    export interface WindowInitialParams {
        width?: number;
        height?: number;
    }
    export function opensInWindow(url: string): WindowInitialParams;
    export function normalizeURL(url: string): string;
}
declare module "common/format/camelify" {
    export function camelify(str: string): string;
    export function camelifyObject(obj: any): any;
}
declare module "common/format/errors" {
    import { LocalizedString } from "common/types/index";
    import { RequestError } from "butlerd";
    import { Download, InstallPlanInfo } from "common/butlerd/messages";
    export function formatError(e: Error, apiErrorPrefix?: string): LocalizedString;
    export function getDownloadError(item: Download): RequestError;
    export function getInstallPlanInfoError(item: InstallPlanInfo): RequestError;
    interface ButlerdErrorTuple {
        error: string;
        errorMessage: string;
        errorCode: number;
    }
    export function getButlerdErrorFromTuple(item: ButlerdErrorTuple): RequestError;
}
declare module "common/format/exit-code" {
    export function formatExitCode(code: number): string;
}
declare module "common/format/filesize" {
    export function fileSize(s: number): string;
}
declare module "common/helpers/get-by-ids" {
    interface RecordMap<T> {
        [key: string]: T;
    }
    function getByIds<T>(records: RecordMap<T>, ids: string[] | number[]): T[];
    export default getByIds;
}
declare module "common/util/lru-memoize" {
    export function memoize<T>(limit: number, f: T): T;
}
declare module "main/reactors/downloads/getters" {
    import { DownloadsState } from "common/types/index";
    import { Download } from "common/butlerd/messages";
    export const getActiveDownload: (downloads: DownloadsState) => Download;
    export const getPendingDownloads: (downloads: DownloadsState) => Download[];
    export const getFinishedDownloads: (downloads: DownloadsState) => Download[];
    export function getPendingForGame(downloads: DownloadsState, gameId: number): Download[];
}
declare module "common/helpers/get-game-status" {
    import { RootState, TaskName } from "common/types/index";
    import { Game, CaveSummary, DownloadKeySummary, DownloadReason } from "common/butlerd/messages";
    import { GameUpdate } from "common/butlerd/messages";
    /**
     * What type of access we have to the game - do we own it,
     * have we created it, have we bought it, etc.
     */
    export enum Access {
        /**
         * Game cannot be bought
         */
        Free = 0,
        /**
         * Game is pay-what-you-want
         */
        Pwyw = 1,
        /**
         * Game has a demo that can be downloaded for free
         */
        Demo = 2,
        /**
         * Game is in press system and so are we
         */
        Press = 3,
        /**
         * We have a download key for the game
         */
        Key = 4,
        /**
         * We have edit rights on the game page
         */
        Edit = 5,
        /**
         * We have no access to the game whatsoever
         */
        None = 6
    }
    export enum OperationType {
        /** The current operation is a download */
        Download = 0,
        /** The current operation is a task */
        Task = 1
    }
    export interface Operation {
        type: OperationType;
        name?: TaskName;
        id?: string;
        reason?: DownloadReason;
        active: boolean;
        paused: boolean;
        progress: number;
        bps?: number;
        eta?: number;
        stage?: string;
    }
    export interface GameStatus {
        downloadKey: DownloadKeySummary;
        cave: CaveSummary;
        numCaves: number;
        access: Access;
        operation: Operation;
        update: GameUpdate;
    }
    function getGameStatus(rs: RootState, game: Game, caveId?: string): GameStatus;
    export default getGameStatus;
}
declare module "common/format/operation" {
    import { LocalizedString, TaskName } from "common/types/index";
    import { Operation } from "common/helpers/get-game-status";
    import { DownloadReason } from "common/butlerd/messages";
    export function formatOperation(op: Operation): LocalizedString;
    export function taskIcon(name: TaskName): "install" | "uninstall" | "stop";
    export function formatTask(name: TaskName, stage?: string): LocalizedString;
    export function formatReason(reason: DownloadReason): LocalizedString;
    export function formatOutcome(reason: DownloadReason): LocalizedString;
}
declare module "common/format/platform" {
    import { Platform } from "common/butlerd/messages";
    /**
     * Formats a platform for humans to read.
     */
    export function formatPlatform(p: Platform): string;
    export function formatArch(arch: string): string;
}
declare module "common/format/price" {
    export function formatPrice(currency: string, value: number): string;
}
declare module "common/format/shape" {
    interface Shape {
        [key: string]: Shape | boolean;
    }
    export function fillShape(input: any, shape: Shape): any;
}
declare module "common/format/show-in-explorer" {
    import { LocalizedString } from "common/types/index";
    export function showInExplorerString(): LocalizedString;
}
declare module "common/format/slugify" {
    /**
     * Returns a version of input with only [a-zA-Z_ ] and
     * collapsed whitespace.
     */
    export function slugify(input: string): string;
}
declare module "common/format/t" {
    import { I18nState, LocalizedString } from "common/types/index";
    /**
     * Returns the input if it's a string, or a localized message if
     * the input is in the form [i18nKeys, {i18nValue1: foo, i18nValue2: bar}?]
     */
    export function t(i18n: I18nState, input: string | LocalizedString): string;
    export function collapseIntlChunks(s: string | string[]): string;
}
declare module "common/format/truncate" {
    interface TruncateOpts {
        length: number;
    }
    /**
     * Returns a truncated version of input. The output length will not exceed
     * opts.length.
     */
    export function truncate(input: string, opts: TruncateOpts): string;
}
declare module "common/format/upload" {
    import { Upload, Build } from "common/butlerd/messages";
    export function formatUploadTitle(u: Upload): string;
    export function formatUploadTitleFancy(u: Upload): string;
    export function formatBuildVersionInfo(b: Build): string;
}
declare module "common/helpers/browser-window" {
    import electron from "electron";
    export const BrowserWindow: {
        fromId(id: number): electron.BrowserWindow;
    };
}
declare module "common/helpers/group-id-by" {
    interface Record {
        id: any;
    }
    interface RecordMap<T extends Record> {
        [id: string]: T;
    }
    interface Grouped {
        [key: string]: string[];
    }
    interface Getter<T> {
        (x: T): string;
    }
    /**
     * Given:
     *   [{id: 1, gameId: 10}, {id: 2, gameId: 20}, {id: 3, gameId: 20}]
     * This will give:
     *   {"10": [1], "20": [2, 3]}
     */
    function groupIdBy<T extends Record>(records: RecordMap<T> | T[], field: string | Getter<T>): Grouped;
    export default groupIdBy;
}
declare module "common/helpers/menu" {
    import electron from "electron";
    export const Menu: {
        buildFromTemplate(template: Electron.MenuItemConstructorOptions[]): Electron.Menu;
        setApplicationMenu(menu: Electron.Menu): void;
    };
}
declare module "common/helpers/secret-click" {
    /**
     * Secret clicks are used to reveal internal screens, for
     * example, performing a secret click on the main itch logo
     * opens secret settings.
     * Performing a secret click on a tab shows its data, on a game
     * shows its install info, etc.
     */
    export function isSecretClick(ev: React.MouseEvent<any>): boolean;
}
declare module "common/util/url" {
    export * from "url";
    /** user.example.org => example.org */
    export function subdomainToDomain(subdomain: string): string;
    export function isItchioURL(s: string): boolean;
}
declare module "common/util/navigation" {
    import { NavigationState, RootState, TabInstance, TabPage, WindSpec, WindState } from "common/types/index";
    export function transformUrl(original: string): string;
    export function currentPage(tabInstance: TabInstance): TabPage | null;
    export function windSpec(): WindSpec;
    export function ambientWind(): string;
    export function ambientWindState(rs: RootState): WindState;
    export function ambientNavigation(rs: RootState): NavigationState;
    interface AmbientTabProps {
        tab: string;
    }
    export function ambientTab(rs: RootState, props: AmbientTabProps): TabInstance;
    export function ambientPage(rs: RootState, props: AmbientTabProps): TabPage;
    export function urlForGame(gameId: number): string;
    export function urlForUser(userId: number): string;
    export function urlForCollection(collectionId: number): string;
    export function urlForInstallLocation(installLocationId: string): string;
}
declare module "common/helpers/space" {
    import { LocalizedString, Store, RootState, TabPage, TabInstance, Action, EvolveTabPayload, Subtract } from "common/types/index";
    import querystring from "querystring";
    /**
     * A Space gives structured info about a tab.
     *
     * Because spaces > tabs.
     */
    export class Space {
        tab: string;
        prefix: string;
        suffix: string;
        private _instance;
        private _page;
        private _protocol;
        private _hostname;
        private _pathname;
        private _pathElements;
        private _query;
        constructor(tab: string, instanceIn: TabInstance);
        static fromStore(store: Store, wind: string, tab: string): Space;
        static fromState(rs: RootState, wind: string, tab: string): Space;
        static fromInstance(tab: string, data: TabInstance): Space;
        makeEvolve(payload: Subtract<EvolveTabPayload, {
            tab: string;
            wind: string;
        }>): Action<EvolveTabPayload>;
        makeLoadingStateChanged(loading: boolean): Action<any>;
        makePageUpdate(page: Partial<TabPage>): Action<any>;
        makeReload(): Action<any>;
        url(): string;
        urlWithParams(newParams: {
            [key: string]: any;
        }): string;
        queryParam(name: string): string;
        resource(): string;
        numericId(): number;
        stringId(): string;
        icon(): string;
        isBrowser(): boolean;
        protocol(): string;
        internalPage(): string;
        firstPathElement(): string;
        firstPathNumber(): number;
        query(): querystring.ParsedUrlQuery;
        page(): TabPage;
        label(): LocalizedString;
        lazyLabel(): LocalizedString;
        isSleepy(): boolean;
        isLoading(): boolean;
        canGoBack(): boolean;
        canGoForward(): boolean;
        history(): TabPage[];
        currentIndex(): number;
        sequence(): number;
    }
    export function internalPageToIcon(internalPage: string): string;
}
declare module "common/helpers/spec-to-button" {
    import { ModalButton, ModalButtonSpec } from "common/types/index";
    export function specToButton(buttonSpec: ModalButtonSpec): ModalButton;
}
declare module "common/helpers/with-timeout" {
    export function withTimeout<T>(label: string, millis: number, p: Promise<T>): Promise<T>;
}
declare module "common/os/platform" {
    import { Platform } from "common/butlerd/messages";
    /**
     * Get platform in the format used by the itch.io API
     */
    export function itchPlatform(): Platform;
}
declare module "common/os/runtime" {
    import { Runtime } from "common/types/index";
    export function currentRuntime(): Runtime;
}
declare module "common/reducers/reducer" {
    import { Action } from "common/types/index";
    interface ActionCreator<Payload extends Object> {
        (payload: Payload): Action<Payload>;
    }
    export interface ActionReducer<State, Payload extends Object> {
        (state: State, action: Action<Payload>): State;
    }
    interface RegisterReducer<State> {
        <Payload extends Object>(actionCreator: ActionCreator<Payload>, reducer: ActionReducer<State, Payload>): void;
    }
    interface ActionHandlerCallback<State> {
        (registerReducer: RegisterReducer<State>): void;
    }
    function reducer<State extends Object>(initialState: State, cb: ActionHandlerCallback<State>, defaultReducer?: ActionReducer<State, any>): ActionReducer<State, State>;
    export default reducer;
}
declare module "common/reducers/system" {
    import { SystemState } from "common/types/index";
    const _default_4: import("common/reducers/reducer").ActionReducer<SystemState, SystemState>;
    export default _default_4;
}
declare module "common/reducers/setup" {
    import { SetupState } from "common/types/index";
    const _default_5: import("common/reducers/reducer").ActionReducer<SetupState, SetupState>;
    export default _default_5;
}
declare module "common/reducers/profile/login" {
    import { ProfileLoginState } from "common/types/index";
    const _default_6: import("common/reducers/reducer").ActionReducer<ProfileLoginState, ProfileLoginState>;
    export default _default_6;
}
declare module "common/reducers/profile/profile" {
    import { Profile } from "common/butlerd/messages";
    const _default_7: import("common/reducers/reducer").ActionReducer<Profile, Profile>;
    export default _default_7;
}
declare module "common/reducers/profile/itchio-uris" {
    const _default_8: import("common/reducers/reducer").ActionReducer<string[], string[]>;
    export default _default_8;
}
declare module "common/reducers/profile/index" {
    import { Reducer } from "redux";
    import { ProfileState } from "common/types/index";
    const _default_9: Reducer<ProfileState, import("redux").AnyAction>;
    export default _default_9;
}
declare module "common/reducers/i18n" {
    import { I18nState } from "common/types/index";
    const _default_10: import("common/reducers/reducer").ActionReducer<I18nState, I18nState>;
    export default _default_10;
}
declare module "common/reducers/ui/menu" {
    import { UIMenuState } from "common/types/index";
    const _default_11: import("common/reducers/reducer").ActionReducer<UIMenuState, UIMenuState>;
    export default _default_11;
}
declare module "common/reducers/ui/search" {
    import { UISearchState } from "common/types/index";
    const _default_12: import("common/reducers/reducer").ActionReducer<UISearchState, UISearchState>;
    export default _default_12;
}
declare module "common/reducers/ui/index" {
    import { Reducer } from "redux";
    import { UIState } from "common/types/index";
    const _default_13: Reducer<UIState, import("redux").AnyAction>;
    export default _default_13;
}
declare module "common/reducers/preferences" {
    import { PreferencesState } from "common/types/index";
    export const initialState: PreferencesState;
    const _default_14: import("common/reducers/reducer").ActionReducer<PreferencesState, PreferencesState>;
    export default _default_14;
}
declare module "common/reducers/derived-reducer" {
    import { Reducer } from "redux";
    function derived<T>(reducer: Reducer<any>, derivedReducer: (state: any) => any): Reducer<T>;
    export default derived;
}
declare module "common/reducers/tasks" {
    import { TasksState } from "common/types/index";
    const _default_15: import("redux").Reducer<TasksState, import("redux").AnyAction>;
    export default _default_15;
}
declare module "common/reducers/downloads" {
    import { DownloadsState } from "common/types/index";
    const _default_16: import("common/reducers/reducer").ActionReducer<DownloadsState, DownloadsState>;
    export default _default_16;
}
declare module "common/reducers/status" {
    import { StatusState } from "common/types/index";
    const _default_17: import("common/reducers/reducer").ActionReducer<StatusState, StatusState>;
    export default _default_17;
}
declare module "common/reducers/game-updates" {
    import { GameUpdatesState } from "common/types/index";
    const _default_18: import("common/reducers/reducer").ActionReducer<GameUpdatesState, GameUpdatesState>;
    export default _default_18;
}
declare module "common/reducers/commons" {
    import { CommonsState } from "common/types/index";
    const _default_19: import("common/reducers/reducer").ActionReducer<CommonsState, CommonsState>;
    export default _default_19;
}
declare module "common/reducers/system-tasks" {
    import { SystemTasksState } from "common/types/index";
    const _default_20: import("common/reducers/reducer").ActionReducer<SystemTasksState, SystemTasksState>;
    export default _default_20;
}
declare module "common/reducers/broth" {
    import { BrothState } from "common/types/index";
    const _default_21: import("common/reducers/reducer").ActionReducer<BrothState, BrothState>;
    export default _default_21;
}
declare module "common/reducers/butlerd" {
    import { ButlerdState } from "common/types/index";
    const _default_22: import("common/reducers/reducer").ActionReducer<ButlerdState, ButlerdState>;
    export default _default_22;
}
declare module "common/reducers/wind/properties" {
    import { WindPropertiesState } from "common/types/index";
    const _default_23: import("common/reducers/reducer").ActionReducer<WindPropertiesState, WindPropertiesState>;
    export default _default_23;
}
declare module "common/reducers/wind/modals" {
    import { ModalsState } from "common/types/index";
    const _default_24: import("common/reducers/reducer").ActionReducer<ModalsState, ModalsState>;
    export default _default_24;
}
declare module "common/reducers/wind/tab-instance/index" {
    import { TabInstance, Action } from "common/types/index";
    export function trimHistory(ti: TabInstance): TabInstance;
    export default function (state: TabInstance, action: Action<any>): TabInstance;
}
declare module "common/reducers/wind/tab-instances" {
    import { Action, TabInstances } from "common/types/index";
    export default function (state: TabInstances, action: Action<any>): any;
}
declare module "common/reducers/wind/navigation" {
    import { NavigationState } from "common/types/index";
    const _default_25: import("common/reducers/reducer").ActionReducer<NavigationState, NavigationState>;
    export default _default_25;
}
declare module "common/reducers/wind/native" {
    import { NativeWindowState } from "common/types/index";
    const _default_26: import("common/reducers/reducer").ActionReducer<NativeWindowState, NativeWindowState>;
    export default _default_26;
}
declare module "common/reducers/wind/index" {
    import { WindState } from "common/types/index";
    const _default_27: import("redux").Reducer<import("redux").CombinedState<WindState>, import("redux").AnyAction>;
    export default _default_27;
}
declare module "common/reducers/winds" {
    import { WindsState, Action } from "common/types/index";
    export default function (state: WindsState, action: Action<any>): any;
}
declare module "common/reducers/all" {
    import { RootState } from "common/types/index";
    const reducer: import("redux").Reducer<import("redux").CombinedState<RootState>, import("redux").AnyAction>;
    export default reducer;
}
declare module "common/reducers/index" {
    import { RootState, Action } from "common/types/index";
    export default function reduce(rs: RootState, action: Action<any>): import("redux").CombinedState<RootState>;
}
declare module "common/types/sf" {
    export interface ReadFileOpts {
        encoding: "utf8" | null;
        flag?: string;
    }
    export interface WriteFileOpts extends ReadFileOpts {
        mode?: number;
    }
    export interface FSError {
        code?: string;
        message: string;
    }
}
declare module "common/util/action-for-game" {
    import { ClassificationAction } from "common/types/index";
    import { Game, CaveSummary } from "common/butlerd/messages";
    /**
     * Returns whether a game can be "launched" or "opened", where "launching" means
     * starting an executable, serving a web game, etc., and "opening" means showing files
     * in a file explorer.
     */
    export function actionForGame(game: Game, cave: CaveSummary | null): ClassificationAction;
}
declare module "main/os/sf" {
    import { Stats } from "fs";
    import { ReadFileOpts, WriteFileOpts } from "common/types/sf";
    import { EventEmitter } from "events";
    /**
     * Returns true if file exists, false if ENOENT, throws if other error
     */
    export function exists(file: string): Promise<boolean>;
    /**
     * List children of a directory
     */
    export function readdir(dir: string): Promise<string[]>;
    /**
     * Return file contents (defaults to utf-8)
     */
    export function readFile(file: string, opts: ReadFileOpts): Promise<string>;
    /**
     * Append content to a file (defaults to utf-8)
     * Creates the file and any required parent directory if they don't exist.
     */
    export function appendFile(file: string, contents: string | Buffer, opts?: WriteFileOpts): Promise<void>;
    /**
     * Writes an utf-8 string to 'file'.
     * Creates the file and any required parent directory if they don't exist.
     */
    export function writeFile(file: string, contents: string | Buffer, opts: WriteFileOpts): Promise<void>;
    /**
     * Turns a stream into a promise, resolves when
     * 'close' or 'end' is emitted, rejects when 'error' is
     */
    export function promised(stream: EventEmitter): Promise<any>;
    /**
     * `mkdir -p`
     */
    export function mkdir(dir: string): Promise<void>;
    /**
     * `mv older newer`
     */
    export function rename(older: string, newer: string): Promise<void>;
    export function lstat(file: string): Promise<Stats>;
    /**
     * `rm -rf`
     */
    export function wipe(dir: string): Promise<void>;
    export function unlink(file: string): Promise<void>;
    export function chmod(file: string, mode: string | number): Promise<void>;
}
declare module "common/util/config" {
    const self: {
        save: () => void;
        get: (key: string) => any;
        set: (key: string, value: any) => void;
        clear: (key: string) => void;
    };
    export default self;
}
declare module "common/util/debounce" {
    function debounce<Arg1, T>(f: (arg1: Arg1) => Promise<T>, ms: number): (arg1: Arg1) => Promise<T>;
    function debounce<Arg1, Arg2, T>(f: (arg1: Arg1, arg2: Arg2) => Promise<T>, ms: number): (arg1: Arg1, arg2: Arg2) => Promise<T>;
    export default debounce;
}
declare module "common/util/frame-name-for-tab" {
    export function frameNameForTab(wind: string, tab: string): string;
}
declare module "common/util/net" {
    export function getResponseHeader(responseHeaders: Record<string, string | string[]> | undefined, headerName: string): string | null;
}
declare module "common/util/partition-for-user" {
    /**
     * Returns the Electron partition for a given itch.io user
     */
    export function partitionForUser(userId: string): string;
    export function partitionForApp(): string;
}
declare module "common/util/watcher" {
    import { Store, RootState, Action } from "common/types/index";
    import { Logger } from "common/logger/index";
    interface IReactor<T extends Object> {
        (store: Store, action: Action<T>): Promise<void>;
    }
    interface Schedule {
        (f: () => void): void;
        dispatch?: (a: Action<any>) => void;
    }
    type Selector = (rs: RootState) => void;
    type SelectorMaker = (store: Store, schedule: Schedule) => Selector;
    /**
     * Allows reacting to certain actions being dispatched
     */
    export class Watcher {
        logger: Logger;
        reactors: {
            [key: string]: IReactor<any>[];
        };
        subs: Watcher[];
        constructor(logger: Logger);
        /**
         * Registers a lazily-created reselect selector that will be called
         * on every tick if the state has changed since the last tick
         */
        onStateChange({ makeSelector }: {
            makeSelector: SelectorMaker;
        }): void;
        /**
         * Registers a reactor for a given action
         */
        on<T extends Object>(actionCreator: (payload: T) => Action<T>, reactor: (store: Store, action: Action<T>) => Promise<void>): void;
        onDebounced<T extends Object>(actionCreator: (payload: T) => Action<T>, ms: number, reactor: (store: Store, action: Action<T>) => Promise<void>): void;
        validate(): void;
        addSub(watcher: Watcher): void;
        removeSub(watcher: Watcher): void;
        protected addWatcher(type: string, reactor: IReactor<any>): void;
    }
}
declare module "common/util/route" {
    import { Store, Action } from "common/types/index";
    import { Watcher } from "common/util/watcher";
    function route(watcher: Watcher, store: Store, action: Action<any>): void;
    export default route;
}
declare module "common/util/should-log-action" {
    function shouldLogAction(action: any): boolean;
    export default shouldLogAction;
}
declare module "main/net/errors" {
    /**
     * Returns true if this is a network error
     */
    export function isNetworkError(e: Error): boolean;
    export class RequestError extends Error {
        constructor(message: string);
    }
    export class RequestTimeout extends RequestError {
        constructor();
    }
    export class RequestAborted extends RequestError {
        constructor();
    }
    export class RequestFormattingFailure extends RequestError {
        constructor(message: string);
    }
    export class RequestParsingFailure extends RequestError {
        constructor(message: string);
    }
}
declare module "main/os/exit" {
    export function exit(exitCode: number): void;
}
declare module "main/logger/console-sink" {
    import { LogSink } from "common/logger/index";
    export const consoleSink: LogSink;
}
declare module "main/logger/index" {
    import { Logger } from "common/logger/index";
    export function getLogStream(): NodeJS.WritableStream;
    export const mainLogger: Logger;
}
declare module "main/crash-reporter" {
    interface ReportIssueOpts {
        log?: string;
        body?: string;
        type?: string;
        repo?: string;
        before?: string;
    }
    export function reportIssue(opts: ReportIssueOpts): void;
    export function mount(): void;
}
declare module "main/index" { }
declare module "main/reactors/preboot/load-preferences" {
    import { PreferencesState, Store } from "common/types/index";
    function loadPreferences(store: Store): Promise<void>;
    export default loadPreferences;
    export function loadPreferencesSync(): PreferencesState;
}
declare module "main/main" {
    export function main(): void;
}
declare module "main/reactors/proxy" {
    import { Watcher } from "common/util/watcher";
    import { ProxySettings } from "common/types/index";
    import { Session } from "electron";
    export default function (watcher: Watcher): void;
    export function applyProxySettings(session: Session, system: ProxySettings): Promise<void>;
}
declare module "main/os/arch" {
    export function arch(): string;
}
declare module "main/reactors/preboot" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/preferences" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/butlerd/mcall" {
    import { RequestCreator } from "butlerd";
    import { SetupFunc } from "common/butlerd/index";
    /**
     * Perform a butlerd call from the main process
     */
    export function mcall<Params, Res>(rc: RequestCreator<Params, Res>, params: {} & Params, setup?: SetupFunc): Promise<Res>;
}
declare module "renderer/helpers/doAsync" {
    export function doAsync(f: () => Promise<void>): void;
}
declare module "main/reactors/make-upload-button" {
    import { LocalizedString, ModalButtonTag } from "common/types/index";
    import { Upload } from "common/butlerd/messages";
    interface UploadButton {
        label: LocalizedString;
        tags: ModalButtonTag[];
        icon: string;
        timeAgo: {
            date: Date | string;
        };
    }
    interface MakeUploadButtonOpts {
        /** Whether to show the size of uploads (default: true) */
        showSize?: boolean;
    }
    export function makeUploadButton(upload: Upload, opts?: MakeUploadButtonOpts): UploadButton;
    export function uploadIcon(upload: Upload): string;
    export function uploadTypeHint(upload: Upload): string;
}
declare module "main/reactors/modals-persistent-state" {
    interface ModalResolveMap {
        [modalId: string]: (response: any) => void;
    }
    const modalResolves: ModalResolveMap;
    export default modalResolves;
}
declare module "main/reactors/modals" {
    import { Watcher } from "common/util/watcher";
    import { Store } from "common/types/index";
    import { TypedModal } from "common/modals/index";
    export function promisedModal<Params extends {} | undefined, Response>(store: Store, payload: TypedModal<Params, Response>): Promise<Response>;
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/as-task-persistent-state" {
    import { Context } from "main/context/index";
    interface TaskMap {
        [id: string]: Context;
    }
    export const getCurrentTasks: () => TaskMap;
}
declare module "main/reactors/tasks/as-task" {
    import { Store, TaskName } from "common/types/index";
    import { Context } from "main/context/index";
    import { RecordingLogger } from "common/logger/index";
    interface AsTaskOpts {
        store: Store;
        name: TaskName;
        gameId: number;
        caveId: string;
        /** Where the task actually performs its duty */
        work: (ctx: Context, logger: RecordingLogger) => Promise<void>;
        /** Called with the thrown error & the logs so far if set */
        onError?: (error: Error, log: string) => Promise<void>;
        onCancel?: () => Promise<void>;
    }
    function asTask(opts: AsTaskOpts): Promise<void>;
    export default asTask;
}
declare module "main/reactors/tasks/show-install-error-modal" {
    import { Store, Action } from "common/types/index";
    import { Game } from "common/butlerd/messages";
    interface InstallErrorParams {
        store: Store;
        e: Error;
        log: string;
        game: Game;
        retryAction: () => Action<any>;
        stopAction: () => Action<any>;
    }
    export function showInstallErrorModal(params: InstallErrorParams): Promise<void>;
}
declare module "main/reactors/tasks/queue-game" {
    import { Game } from "common/butlerd/messages";
    import { Store } from "common/types/index";
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
    export function queueInstall(store: Store, game: Game, uploadId?: number): Promise<void>;
}
declare module "main/reactors/url" {
    import { Store } from "common/types/index";
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
    /**
     * Returns true if it was an action URL
     */
    export function handleItchioUrl(store: Store, uri: string): boolean;
}
declare module "main/net/register-itch-protocol" {
    import { Store } from "common/types/index";
    import { Session } from "electron";
    export function registerItchProtocol(store: Store, ses: Session): void;
}
declare module "main/reactors/open-app-devtools" {
    import "electron";
    export function openAppDevTools(bw: Electron.BrowserWindow): void;
}
declare module "renderer/t" {
    import { IntlShape } from "react-intl";
    import { LocalizedString } from "common/types/index";
    export function T(input: any): JSX.Element | string;
    export function TString(intl: IntlShape, input: any): string;
    interface I18nVariables {
        [key: string]: string | number | undefined;
        defaultValue?: string;
    }
    export let _: (key: string, variables?: I18nVariables) => LocalizedString;
}
declare module "main/reactors/web-contents-context-menu" {
    import { Store } from "common/types/index";
    export function hookWebContentsContextMenu(wc: Electron.WebContents, wind: string, store: Store): void;
}
declare module "main/reactors/winds" {
    import { NativeWindowState, RootState } from "common/types/index";
    import { Watcher } from "common/util/watcher";
    import { BrowserWindow } from "electron";
    export default function (watcher: Watcher): void;
    export function getNativeState(rs: RootState, wind: string): NativeWindowState;
    export function getNativeWindow(rs: RootState, wind: string): BrowserWindow;
}
declare module "main/net/request/index" {
    import { RequestFunc } from "common/types/index";
    let request: RequestFunc;
    export { request };
}
declare module "main/os/ifs" {
    /** reads an entire file as an UTF-8 string */
    export function readFile(file: string): Promise<string>;
    /** returns true if a file can be read (actually reads it to test) */
    export function exists(file: string): Promise<boolean>;
    import * as sf from "main/os/sf";
    export const writeFile: typeof sf.writeFile;
}
declare module "main/reactors/locales" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tray-persistent-state" {
    import { Store, Action } from "common/types/index";
    export function getTray(store: Store): Electron.Tray;
    export function rememberNotificationAction(action: Action<any>): void;
}
declare module "main/reactors/context-menu/flesh-out-template" {
    import { Store, MenuTemplate, Runtime } from "common/types/index";
    export function fleshOutTemplate(wind: string, store: Store, runtime: Runtime, template: MenuTemplate): Electron.MenuItemConstructorOptions[];
}
declare module "main/reactors/tray" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/menu" {
    import { Watcher } from "common/util/watcher";
    import { Runtime } from "common/types/index";
    export default function (watcher: Watcher, runtime: Runtime): void;
}
declare module "main/os/explorer" {
    export function open(folder: string): void;
}
declare module "main/reactors/install-locations" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/os/spawn" {
    import { Logger } from "common/logger/index";
    import stream from "stream";
    import { MinimalContext } from "main/context/index";
    interface SpawnOpts {
        /** Context this should run in */
        ctx: MinimalContext;
        /** Command to spawn */
        command: string;
        /** Arguments */
        args: string[];
        /** Defaults to eol for the current platform ("\r\n" or "\n") */
        split?: string;
        /** Called when the process has been started and we're ready to write to stdin */
        onStdinReady?: (stdin: stream.Writable) => void;
        /** If set, called on each line of stdout */
        onToken?: (token: string) => void;
        /** If set, called on each line of stderr */
        onErrToken?: (token: string) => void;
        opts?: {
            /** Environment variables */
            env?: {
                [key: string]: string;
            };
            /** Current working directory */
            cwd?: string;
            /** shell that should be used to run a command */
            shell?: string;
        };
        logger: Logger;
        /** if set, do not redirect stdout/stderr */
        inheritStd?: boolean;
    }
    interface ExecResult {
        code: number;
        out: string;
        err: string;
    }
    interface SpawnInterface {
        (opts: SpawnOpts): Promise<number>;
        assert(opts: SpawnOpts): Promise<void>;
        exec(opts: SpawnOpts): Promise<ExecResult>;
        getOutput(opts: SpawnOpts): Promise<string>;
        escapePath(arg: string): string;
    }
    let spawn: SpawnInterface;
    export default spawn;
}
declare module "main/broth/itch-setup" {
    import { Store } from "common/types/index";
    import { Logger } from "common/logger/index";
    export const itchSetupLock: {
        reason: string;
        with(logger: Logger, reason: string, f: () => Promise<void>): Promise<boolean>;
    };
    export interface RunItchSetupOpts {
        args: string[];
        logger: Logger;
        onMessage: (msg: ISM) => void;
    }
    export function runItchSetup(store: Store, opts: RunItchSetupOpts): Promise<boolean>;
    export interface ISM {
        type: "log" | "progress" | "installing-update" | "update-ready" | "no-update-available" | "update-failed" | "ready-to-relaunch";
        payload: any;
    }
    export interface ISM_Log {
        level: string;
        message: string;
    }
    export interface ISM_Progress {
        progress: number;
        bps: number;
        eta: number;
    }
    export interface ISM_InstallingUpdate {
        version: string;
    }
    export interface ISM_UpdateReady {
        version: string;
    }
    export interface ISM_UpdateFailed {
        message: string;
    }
    export interface ISM_ReadyToRelaunch {
    }
}
declare module "main/net/download" {
    import { Logger } from "common/logger/index";
    import { ProgressInfo } from "common/types/index";
    /**
     * Download to file without using butler
     */
    export function downloadToFile(onProgress: (progress: ProgressInfo) => void, logger: Logger, url: string, file: string): Promise<void>;
    export function downloadToFileWithRetry(onProgress: (progress: ProgressInfo) => void, logger: Logger, url: string, file: string): Promise<void>;
}
declare module "main/net/request/metal-request" {
    import { HTTPMethod, RequestOpts, Response } from "common/types/net";
    export function request(method: HTTPMethod, uri: string, data?: any, opts?: RequestOpts): Promise<Response>;
}
declare module "main/broth/formulas" {
    import { Logger } from "common/logger/index";
    import { MinimalContext } from "main/context/index";
    export interface FormulaSpec {
        sanityCheck?: (ctx: MinimalContext, logger: Logger, versionPrefix: string) => Promise<void>;
        transformChannel?: (channel: string) => string;
        getSemverConstraint?: () => string | null;
        requiredAtStartup?: boolean;
    }
    interface Formulas {
        butler: FormulaSpec;
        [formulaName: string]: FormulaSpec;
    }
    let self: Formulas;
    export default self;
}
declare module "main/broth/platform" {
    /** platform in go format */
    export function goos(): string;
    /** arch in go format */
    export function goarch(): "amd64" | "386" | "unknown";
}
declare module "main/broth/unzip" {
    import { Logger } from "common/logger/index";
    import { ProgressInfo } from "common/types/index";
    interface UnzipOpts {
        archivePath: string;
        destination: string;
        logger: Logger;
        onProgress: (info: ProgressInfo) => void;
    }
    export function unzip(opts: UnzipOpts): Promise<void>;
}
declare module "main/broth/package" {
    import { Logger } from "common/logger/index";
    import { Store } from "common/types/index";
    type Version = string;
    export interface EnsureOpts {
        startup?: boolean;
        logger: Logger;
    }
    export interface UpgradeOpts {
        logger: Logger;
    }
    export interface PackageLike {
        ensure(opts: EnsureOpts): Promise<void>;
        upgrade(opts: UpgradeOpts): Promise<void>;
    }
    export class Package implements PackageLike {
        private store;
        private formula;
        private prefix;
        private name;
        private channel;
        private baseURL;
        private semverConstraint;
        constructor(store: Store, prefix: string, name: string);
        buildURL(path: string, queryParams?: {
            [key: string]: any;
        }): string;
        buildDownloadURL(version: Version, path: string): string;
        /** fetch latest version number from repo */
        getLatestVersion(logger: Logger): Promise<Version>;
        getName(): string;
        getVersionsDir(): string;
        getDownloadsDir(): string;
        getChosenMarkerPath(): string;
        getVersionPrefix(version: Version): string;
        getInstalledMarkerPath(version: Version): string;
        shouldUseLocal(): boolean;
        ensure(opts: EnsureOpts): Promise<void>;
        ensureLocal(logger: any): Promise<void>;
        getCurrentVersionPrefix(): string;
        refreshPrefix(logger: Logger, version: Version): void;
        upgradeLock: boolean;
        upgrade(opts: UpgradeOpts): Promise<void>;
        private stage;
        private emitProgress;
        private doUpgrade;
        hasInstallMarker(version: Version): Promise<boolean>;
        writeInstallMarker(version: Version): Promise<void>;
        getChosenVersion(): Promise<Version | null>;
        writeChosenVersion(logger: Logger, version: Version): Promise<void>;
        cleanOldVersions(logger: Logger): Promise<void>;
        getPresentVersions(logger: Logger): Promise<Version[]>;
        isVersionValid(logger: Logger, v: Version): Promise<boolean>;
        private makeLogger;
    }
}
declare module "main/broth/self-package" {
    import { PackageLike, UpgradeOpts, EnsureOpts } from "main/broth/package";
    import { Store } from "common/types/index";
    import { Logger } from "common/logger/index";
    export class SelfPackage implements PackageLike {
        private store;
        private name;
        constructor(store: Store, name: string);
        ensure(opts: EnsureOpts): Promise<void>;
        upgrade(opts: UpgradeOpts): Promise<void>;
        private onMessage;
        private stage;
        makeLogger(parentLogger: Logger): Logger;
    }
}
declare module "main/broth/manager" {
    import { EnsureOpts, UpgradeOpts } from "main/broth/package";
    import { Store } from "common/types/index";
    export class Manager {
        private pkgs;
        private prefix;
        constructor(store: Store);
        ensure(opts: EnsureOpts): Promise<void>;
        upgrade(opts: UpgradeOpts): Promise<void>;
    }
}
declare module "main/reactors/setup" {
    import { Watcher } from "common/util/watcher";
    import { Manager } from "main/broth/manager";
    export let manager: Manager;
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/self-update" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tabs" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/triggers" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/open-at-login" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tab-save" {
    import { Profile } from "common/butlerd/messages";
    import { Store } from "common/types/index";
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
    export function saveTabs(store: Store): Promise<void>;
    export function restoreTabs(store: Store, profile: Profile): Promise<void>;
}
declare module "main/reactors/login" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/change-user" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/request-cave-uninstall" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/manage-game" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/manage-cave" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/force-close-game-request" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/show-game-update" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/clear-browsing-data" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/scan-install-locations" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/dialogs/index" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/i18n" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/context-menu/build-template" {
    import { MenuTemplate, Store } from "common/types/index";
    import { Game } from "common/butlerd/messages";
    export function concatTemplates(a: MenuTemplate, b: MenuTemplate): MenuTemplate;
    export function newTabControls(store: Store, wind: string, tab: string): MenuTemplate;
    export function closeTabControls(store: Store, wind: string, tab: string): MenuTemplate;
    export function gameControls(store: Store, game: Game): MenuTemplate;
    export function userMenu(store: Store): MenuTemplate;
}
declare module "main/reactors/context-menu" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/profile" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/navigation" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/commons" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/purchases" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/abort-task" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/queue-cave-reinstall" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/downloads/perform-uninstall" {
    import { Logger } from "common/logger/index";
    import { Store } from "common/types/index";
    export function performUninstall(store: Store, parentLogger: Logger, caveId: string): Promise<void>;
}
declare module "main/reactors/tasks/queue-cave-uninstall" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/explore-cave" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/abort-game" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/switch-version-cave" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/view-cave-details" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/tasks/index" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/downloads/show-download-error" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/downloads/download-ended" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/downloads/driver-persistent-state" {
    import { Conversation } from "butlerd";
    export enum Phase {
        IDLE = 0,
        STARTING = 1,
        RUNNING = 2,
        CANCELLING = 3
    }
    class State {
        private phase;
        private convo;
        constructor();
        cancel(): Promise<void>;
        registerConvo(convo: Conversation): void;
        isConvoCurrent(convo: Conversation): boolean;
        setPhase(phase: Phase): void;
        getPhase(): Phase;
    }
    export const state: State;
}
declare module "main/reactors/downloads/driver" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/downloads/operations" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/downloads/index" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/launch/itch-cave-protocol" {
    import { Session } from "electron";
    export function registerItchCaveProtocol(gameSession: Session, fileRoot: string): Promise<void>;
}
declare module "main/reactors/launch/perform-html-launch" {
    import { Context } from "main/context/index";
    import { Game, HTMLLaunchParams, HTMLLaunchResult } from "common/butlerd/messages";
    import { Logger } from "common/logger/index";
    interface HTMLLaunchOpts {
        ctx: Context;
        game: Game;
        logger: Logger;
        params: HTMLLaunchParams;
    }
    export function performHTMLLaunch(opts: HTMLLaunchOpts): Promise<HTMLLaunchResult>;
}
declare module "main/reactors/launch/pick-manifest-action" {
    import { Store } from "common/types/index";
    import { Game, Action } from "common/butlerd/messages";
    export function pickManifestAction(store: Store, manifestActions: Action[], game: Game): Promise<number>;
}
declare module "main/reactors/launch/perform-launch" {
    import { Cave, Game } from "common/butlerd/messages";
    import { RecordingLogger } from "common/logger/index";
    import { Context } from "main/context/index";
    export function performLaunch(ctx: Context, logger: RecordingLogger, cave: Cave, game: Game): Promise<void>;
}
declare module "main/reactors/queue-launch" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/updater" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/game-updates" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/web-contents/parse-well-known-url" {
    export interface WellKnownUrlResult {
        resource: string;
        url: string;
    }
    export function parseWellKnownUrl(url: string): WellKnownUrlResult;
}
declare module "main/reactors/web-contents/web-contents-state" {
    import { WebContents } from "electron";
    export function storeWebContents(wind: string, tab: string, wc: WebContents): void;
    export function getWebContents(wind: string, tab: string): WebContents | null;
    export function forgetWebContents(wind: string, tab: string): void;
    export function webContentsToTab(wc: WebContents): string;
}
declare module "main/reactors/web-contents" {
    import { Watcher } from "common/util/watcher";
    export type ExtendedWebContents = Electron.WebContents & {
        history: string[];
        currentIndex: number;
        pendingIndex: number;
        inPageIndex: number;
    };
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/notifications" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/clipboard" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/silent-location-scan" {
    import { Watcher } from "common/util/watcher";
    export default function (watcher: Watcher): void;
}
declare module "main/reactors/index" {
    import { Watcher } from "common/util/watcher";
    import { Logger } from "common/logger/index";
    export default function getWatcher(logger: Logger): Watcher;
}
declare module "main/store" {
    import { Store } from "common/types/index";
    const store: Store;
    export default store;
}
declare module "main/boot/test-paths" {
    export function setup(): void;
}
interface ExtWindow {
    onCaptcha: (response: string) => void;
    captchaResponse: string;
}
declare const extWindow: ExtWindow;
declare module "main/inject/inject-game" { }
declare module "main/net/index" {
    export * from "main/net/request/index";
    export * from "main/net/download";
}
declare module "main/os/assert-presence" {
    import { Context } from "main/context/index";
    interface AssertPresenceResult {
        code: number;
        stdout: string;
        stderr: string;
        parsed: string;
    }
    export function assertPresence(ctx: Context, command: string, args: string[], parser: RegExp, extraOpts?: any): Promise<AssertPresenceResult>;
}
declare module "main/reactors/tasks/getters" {
    import { Task, TasksState } from "common/types/index";
    export const getActiveTask: (tasks: TasksState) => Task;
    export const getRunningTasks: (tasks: TasksState) => Task[];
}
declare module "renderer/logger/index" {
    import { Logger } from "common/logger/index";
    export const rendererLogger: Logger;
}
declare module "renderer/store" {
    import { ChromeStore } from "common/types/index";
    const store: ChromeStore;
    export default store;
}
declare module "renderer/hocs/hook" {
    import React from "react";
    import { DispatchProp, InferableComponentEnhancerWithProps } from "react-redux";
    import { RootState, Subtract } from "common/types/index";
    import { Selector, ParametricSelector } from "reselect";
    interface MakeSelectorFunc {
        <Result>(s: Selector<RootState, Result>): Selector<RootState, Result>;
    }
    interface MakeParametricSelectorFunc<InputProps> {
        <Result>(s: ParametricSelector<RootState, InputProps, Result>): ParametricSelector<RootState, InputProps, Result>;
    }
    export function hook<DerivedProps = {}>(makeSelectors?: (f: MakeSelectorFunc) => {
        [K in keyof DerivedProps]: Selector<RootState, DerivedProps[K]>;
    }): InferableComponentEnhancerWithProps<DerivedProps & DispatchProp<any>, {}>;
    export function hookWithProps<InputProps>(inputComponent: React.ComponentType<InputProps>): <DerivedProps>(makeSelectors: (f: MakeParametricSelectorFunc<InputProps>) => { [K in keyof DerivedProps]: ParametricSelector<RootState, InputProps, DerivedProps[K]>; }) => <Props>(component: React.ComponentType<Props>) => React.ComponentType<Pick<InputProps, Exclude<keyof InputProps, keyof DerivedProps | "dispatch">>>;
}
declare module "renderer/styles" {
    export const baseColors: {
        codGray: string;
        darkMineShaft: string;
        lightMineShaft: string;
        zambezi: string;
        silverChalice: string;
        swissCoffee: string;
        ivory: string;
        flushMahogany: string;
        mintJulep: string;
        gossip: string;
        shamrock: string;
        amber: string;
        heliotrope: string;
        carnation: string;
        vividTangerine: string;
    };
    export const uiColors: {
        background: string;
        border: string;
        borderFocused: string;
        textShadow: string;
        boxShadow: string;
    };
    export const colors: {
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    };
    export const fontSizes: {
        small: string;
        sidebar: string;
        smaller: string;
        baseText: string;
        modal: string;
        large: string;
        larger: string;
        huge: string;
        huger: string;
        enormous: string;
    };
    export const borderRadii: {
        explanation: string;
    };
    export const widths: {
        searchSidebar: string;
        handle: string;
        gridItem: string;
    };
    export const theme: {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    };
    export type Theme = typeof theme;
    import * as sc from "styled-components";
    const styled: sc.ThemedStyledInterface<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>, css: sc.ThemedCssFunction<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>, keyframes: (strings: TemplateStringsArray | sc.CSSKeyframes, ...interpolations: sc.SimpleInterpolation[]) => sc.Keyframes, createGlobalStyle: <P extends object = {}>(first: sc.CSSObject | TemplateStringsArray | sc.InterpolationFunction<sc.ThemedStyledProps<P, {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>, ...interpolations: sc.Interpolation<sc.ThemedStyledProps<P, {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>[]) => sc.GlobalStyleComponent<P, {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>, ThemeProvider: sc.BaseThemeProviderComponent<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>;
    export default styled;
    export { css, keyframes, createGlobalStyle, ThemeProvider };
    export const animations: {
        horizontalIndeterminate: sc.Keyframes;
        horizontalScan: sc.Keyframes;
        enterLeft: sc.Keyframes;
        fixedEnterTop: sc.Keyframes;
        fixedEnterBottom: sc.Keyframes;
        fixedEnterLeft: sc.Keyframes;
        fixedEnterRight: sc.Keyframes;
        fadeIn: sc.Keyframes;
        enterTop: sc.Keyframes;
        enterBottom: sc.Keyframes;
        loadBorder: sc.Keyframes;
        lineSpinner: sc.Keyframes;
    };
    export const heavyInput: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const searchInput: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const searchIcon: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const clickable: sc.FlattenSimpleInterpolation;
    export const progress: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const horizontalScan: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const singleLine: sc.FlattenSimpleInterpolation;
    export const secondaryLink: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const meat: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const prefChunk: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const prefChunkActive: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const boxy: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
    export const windowBorder: sc.FlattenInterpolation<sc.ThemeProps<{
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>>;
}
declare module "renderer/App/Layout/NonLocalIndicator" {
    import React from "react";
    class NonLocalIndicator extends React.PureComponent<{}, {}> {
        render(): JSX.Element;
    }
    export default NonLocalIndicator;
}
declare module "renderer/basics/Icon" {
    import { LocalizedString } from "common/types/index";
    import React from "react";
    /**
     * An icon from the icomoon font.
     * Peek in the static/fonts/icomoon/ folder to learn more.
     */
    class Icon extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        icon: string;
        hint?: LocalizedString;
        className?: string;
        onClick?: any;
    }
    export default Icon;
}
declare module "renderer/App/Layout/StatusBar" {
    import { Dispatch, LocalizedString } from "common/types/index";
    import React from "react";
    /**
     * Displays our current progress when checking for updates, etc.
     */
    class StatusBar extends React.PureComponent<Props> {
        constructor(props: StatusBar["props"], context?: any);
        render(): JSX.Element;
    }
    interface Props {
        dispatch: Dispatch;
        statusMessages: LocalizedString[];
    }
    const _default_28: import("react-redux").ConnectedComponent<typeof StatusBar, Pick<React.ClassAttributes<StatusBar> & Props, "key" | "ref">>;
    export default _default_28;
}
declare module "renderer/hocs/withProfile" {
    import React from "react";
    import { Profile } from "common/butlerd/messages";
    import { Subtract } from "common/types/index";
    export interface ProfileContextProps {
        profile: Profile;
    }
    export const ProfileProvider: React.Provider<Profile>;
    export const ProfileConsumer: React.Consumer<Profile>;
    export const withProfile: <P extends ProfileContextProps>(Component: React.ComponentType<P>) => (props: Pick<P, Exclude<keyof P, "profile">>) => JSX.Element;
}
declare module "renderer/basics/Filler" {
    const Filler: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export default Filler;
}
declare module "renderer/basics/IconButton" {
    import { LocalizedString } from "common/types/index";
    import React from "react";
    class IconButton extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        icon: string | JSX.Element;
        disabled?: boolean;
        className?: string;
        id?: string;
        hint?: LocalizedString;
        hintPosition?: "top" | "left" | "right" | "bottom";
        onClick?: React.MouseEventHandler<HTMLElement>;
        onMouseDown?: React.MouseEventHandler<HTMLElement>;
        onContextMenu?: React.MouseEventHandler<HTMLElement>;
        big?: boolean;
        huge?: boolean;
        enormous?: boolean;
        emphasized?: boolean;
    }
    export default IconButton;
}
declare module "renderer/basics/TitleBar/NewVersionAvailable" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    class NewVersionAvailable extends React.PureComponent<Props> {
        render(): JSX.Element;
        onClick: () => void;
    }
    interface Props {
        dispatch: Dispatch;
        available: boolean;
    }
    const _default_29: import("react-redux").ConnectedComponent<typeof NewVersionAvailable, Pick<React.ClassAttributes<NewVersionAvailable> & Props, "key" | "ref">>;
    export default _default_29;
}
declare module "renderer/basics/TitleBar/UserMenu" {
    import { User } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    class UserMenu extends React.PureComponent<Props> {
        render(): JSX.Element;
        me(): JSX.Element;
        openMenu: (e: React.MouseEvent<any>) => void;
    }
    interface Props {
        dispatch: Dispatch;
        me: User;
    }
    const _default_30: import("react-redux").ConnectedComponent<typeof UserMenu, Pick<React.ClassAttributes<UserMenu> & Props, "key" | "ref">>;
    export default _default_30;
}
declare module "renderer/basics/TitleBar/index" {
    import { TabInstance } from "common/types/index";
    import { Dispatch } from "common/types/index";
    import React from "react";
    export const titleBarHeight = 40;
    interface Props {
        tab: string;
        secondary?: boolean;
        dispatch: Dispatch;
        tabInstance: TabInstance;
        maximized: boolean;
        focused: boolean;
        macos: boolean;
    }
    const _default_31: React.ComponentType<Pick<Props, "secondary" | "tab">>;
    export default _default_31;
}
declare module "renderer/basics/Button" {
    import { LocalizedString } from "common/types/index";
    import React from "react";
    class Button extends React.PureComponent<Props, any> {
        render(): JSX.Element;
    }
    interface Props {
        className?: string;
        onClick?: React.MouseEventHandler<HTMLDivElement>;
        primary?: boolean;
        hint?: LocalizedString;
        icon?: string;
        iconComponent?: JSX.Element;
        label?: JSX.Element | string;
        wide?: boolean;
        fat?: boolean;
        disabled?: boolean;
        id?: string;
        translucent?: boolean;
    }
    export default Button;
}
declare module "renderer/basics/Link" {
    import React from "react";
    class Link extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default Link;
    class Props {
        onClick?: React.EventHandler<React.MouseEvent<HTMLSpanElement>>;
        onContextMenu?: React.EventHandler<React.MouseEvent<HTMLSpanElement>>;
        label?: JSX.Element | string;
        children?: string | JSX.Element | (string | JSX.Element)[];
        className?: string;
    }
}
declare module "renderer/basics/LoadingCircle/Circle" {
    import React from "react";
    export default class Circle extends React.PureComponent<Props> {
        getPathStyles(): {
            pathString: string;
            trailPathStyle: {
                strokeDasharray: string;
                strokeDashoffset: string;
            };
            strokePathStyle: {
                strokeDasharray: string;
                strokeDashoffset: string;
            };
        };
        render(): JSX.Element;
    }
    interface Props {
        percent: number;
        gapDegree?: number;
        trailWidth: number;
        trailColor: string;
        trailPathStyle?: React.CSSProperties;
        strokeWidth: number;
        strokeColor: string;
        strokeLinecap?: "inherit" | "butt" | "round" | "square";
        strokePathStyle?: React.CSSProperties;
        style?: React.CSSProperties;
    }
}
declare module "renderer/basics/LoadingCircle/index" {
    import React from "react";
    class LoadingCircle extends React.PureComponent<LoadingCircleProps> {
        render(): JSX.Element;
    }
    export default LoadingCircle;
    interface LoadingCircleProps {
        className?: string;
        progress: number;
        bare?: boolean;
        wide?: boolean;
        huge?: boolean;
    }
}
declare module "renderer/basics/FormattedDuration" {
    interface Props {
        /** A duration, in seconds */
        secs: number;
    }
    const _default_32: ({ secs }: Props) => JSX.Element;
    /**
     * Renders a human-friendly (and localized) duration
     */
    export default _default_32;
}
declare module "renderer/basics/DownloadProgressSpan" {
    interface Props {
        bps?: number;
        eta?: number;
        downloadsPaused: boolean;
        onlyBPS?: boolean;
        onlyETA?: boolean;
    }
    export default function DownloadProgressSpan({ bps, eta, downloadsPaused, onlyBPS, onlyETA, }: Props): JSX.Element;
}
declare module "renderer/scenes/GateScene/BlockingOperation" {
    import { Dispatch, SetupOperation } from "common/types/index";
    import React from "react";
    class BlockingOperation extends React.PureComponent<Props> {
        render(): JSX.Element;
        viewBlockingOperationLog: () => void;
        onRetrySetup: () => void;
        learnAboutAntivirus: () => void;
    }
    interface Props {
        blockingOperation: SetupOperation;
        windows: boolean;
        dispatch: Dispatch;
    }
    const _default_33: import("react-redux").ConnectedComponent<typeof BlockingOperation, Pick<React.ClassAttributes<BlockingOperation> & Props, "key" | "blockingOperation" | "ref">>;
    export default _default_33;
}
declare module "renderer/butlerd/rcall" {
    import { RequestCreator } from "butlerd";
    import { SetupFunc } from "common/butlerd/index";
    /**
     * Perform a butlerd call from the renderer process
     */
    export function rcall<Params, Res>(rc: RequestCreator<Params, Res>, params: {} & Params, setup?: SetupFunc): Promise<Res>;
}
declare module "renderer/hocs/watching" {
    export { Watcher } from "common/util/watcher";
    import React from "react";
    /**
     * watching is an ES2017 decorator that lets components subscribe
     * to actions, much like reactors. They have to define a `subscribe`
     * method that will get a watcher as only argument.
     */
    export default function <C extends React.ComponentType<P>, P>(constructor: C): C;
}
declare module "renderer/scenes/GateScene/styles" {
    export const Links: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
}
declare module "renderer/scenes/GateScene/LoginForm/index" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    class LoginForm extends React.PureComponent<Props, State> {
        constructor(props: Props, context?: any);
        render(): JSX.Element;
        openRegisterPage: () => void;
        openPasswordResetPage: () => void;
        togglePasswordReveal: (ev: React.MouseEvent<HTMLElement>) => void;
        renderError(): JSX.Element;
        username: HTMLInputElement | null;
        gotUsernameField: (el: HTMLInputElement) => HTMLInputElement;
        password: HTMLInputElement | null;
        gotPasswordField: (el: HTMLInputElement) => HTMLInputElement;
        handleSubmit: () => void;
        handleKeyDown: (e: React.KeyboardEvent<any>) => void;
    }
    interface Props {
        showSaved: () => void;
        dispatch: Dispatch;
        lastUsername: string | null;
        error: Error | null;
    }
    interface State {
        passwordShown: boolean;
    }
    const _default_34: import("react-redux").ConnectedComponent<typeof LoginForm, Pick<React.ClassAttributes<LoginForm> & Props, "key" | "ref" | "showSaved">>;
    export default _default_34;
}
declare module "renderer/basics/TimeAgo" {
    import React from "react";
    class TimeAgo extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default TimeAgo;
    interface Props {
        date: Date | string;
        className?: string;
        before?: string | JSX.Element;
    }
}
declare module "renderer/scenes/GateScene/RememberedProfiles/RememberedProfile" {
    import { Profile } from "common/butlerd/messages";
    import React from "react";
    import { Dispatch } from "common/types/index";
    class RememberedProfile extends React.PureComponent<Props> {
        render(): JSX.Element;
        useThisProfile: () => void;
        onForget: (e: React.MouseEvent<HTMLElement>) => void;
    }
    interface Props {
        profile: Profile;
        dispatch: Dispatch;
    }
    const _default_35: import("react-redux").ConnectedComponent<typeof RememberedProfile, Pick<React.ClassAttributes<RememberedProfile> & Props, "profile" | "key" | "ref">>;
    export default _default_35;
}
declare module "renderer/scenes/GateScene/RememberedProfiles/index" {
    import { Profile } from "common/butlerd/messages";
    import React from "react";
    import { Watcher } from "renderer/hocs/watching";
    class RememberedProfiles extends React.PureComponent<Props> {
        render(): JSX.Element;
        subscribe(watcher: Watcher): void;
    }
    export default RememberedProfiles;
    interface Props {
        profiles: Profile[];
        showForm: () => void;
    }
}
declare module "renderer/scenes/GateScene/LoginScreen" {
    import { Profile } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { Watcher } from "renderer/hocs/watching";
    class LoginScreen extends React.PureComponent<Props, State> {
        constructor(props: LoginScreen["props"], context?: any);
        componentDidMount(): void;
        subscribe(watcher: Watcher): void;
        refresh(): void;
        render(): JSX.Element;
        showForm: () => void;
        showSaved: () => void;
    }
    interface Props {
        dispatch: Dispatch;
    }
    interface State {
        loading: boolean;
        showingSaved: boolean;
        profiles: Profile[];
    }
    const _default_36: import("react-redux").ConnectedComponent<typeof LoginScreen, Pick<React.ClassAttributes<LoginScreen> & Props, "key" | "ref">>;
    export default _default_36;
}
declare module "renderer/scenes/GateScene/LogoIndicator" {
    import React from "react";
    import Vivus from "vivus";
    class LogoIndicator extends React.PureComponent<Props> {
        vivus: Vivus;
        render(): JSX.Element;
        gotEl: (el: HTMLDivElement) => void;
        componentDidUpdate(): void;
        update: () => void;
    }
    interface Props {
        progress: number;
    }
    const _default_37: import("react-redux").ConnectedComponent<typeof LogoIndicator, Pick<React.ClassAttributes<LogoIndicator> & Props, "key" | "ref">>;
    export default _default_37;
}
declare module "renderer/scenes/GateScene/index" {
    import { SetupOperation } from "common/types/index";
    import React from "react";
    class GateScene extends React.PureComponent<Props> {
        username: HTMLInputElement;
        password: HTMLInputElement;
        render(): JSX.Element;
        renderChild(): JSX.Element;
    }
    interface Props {
        stage: "setup" | "login";
        errors: string[];
        blockingOperation: SetupOperation;
    }
    const _default_38: import("react-redux").ConnectedComponent<typeof GateScene, Pick<React.ClassAttributes<GateScene> & Props, "key" | "ref">>;
    export default _default_38;
}
declare module "renderer/hocs/withTab" {
    import React from "react";
    import { Subtract } from "common/types/index";
    export interface TabContextProps {
        tab: string;
    }
    export const TabProvider: React.Provider<string>;
    export const TabConsumer: React.Consumer<string>;
    export const withTab: <P extends TabContextProps>(Component: React.ComponentType<P>) => (props: Pick<P, Exclude<keyof P, "tab">>) => JSX.Element;
}
declare module "renderer/hocs/tab-utils" {
    import { Subtract, EvolveTabPayload, Dispatch, QueryParams } from "common/types/index";
    import { actions } from "common/actions/index";
    interface TabProps {
        dispatch: Dispatch;
        tab: string;
    }
    interface ScopeFields {
        wind: string;
        tab: string;
    }
    export function dispatchTabLoadingStateChanged(props: TabProps, loading: boolean): void;
    export function dispatchTabGotWebContents(props: TabProps, webContentsId: number): void;
    export function dispatchTabLosingWebContents(props: TabProps): void;
    export function dispatchTabEvolve(props: TabProps, payload: Subtract<EvolveTabPayload, ScopeFields>): void;
    export function dispatchTabPageUpdate(props: TabProps, page: typeof actions.tabPageUpdate["payload"]["page"]): void;
    export function dispatchTabReloaded(props: TabProps): void;
    export function dispatchTabStop(props: TabProps): void;
    export function dispatchTabGoForward(props: TabProps): void;
    export function dispatchTabGoBack(props: TabProps): void;
    export function dispatchOpenTabBackHistory(props: TabProps, payload: Subtract<typeof actions.openTabBackHistory["payload"], ScopeFields>): void;
    export function dispatchOpenTabForwardHistory(props: TabProps, payload: Subtract<typeof actions.openTabForwardHistory["payload"], ScopeFields>): void;
    export function urlWithParams(url: string, params: QueryParams): string;
}
declare module "renderer/basics/NavigationBar" {
    import { Dispatch } from "common/types/index";
    interface Props {
        tab: string;
        dispatch: Dispatch;
        loading: boolean;
        showAddressBar?: boolean;
        url: string;
        internalPage: string;
        canGoBack: string;
        canGoForward: string;
    }
    const _default_39: (props: Pick<Pick<Props, "tab" | "loading" | "showAddressBar">, "loading" | "showAddressBar">) => JSX.Element;
    export default _default_39;
}
declare module "renderer/basics/FiltersContainer" {
    import React from "react";
    export const filtersContainerHeight = 40;
    export const FiltersContainerDiv: import("styled-components").StyledComponent<"section", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    class FiltersContainer extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        loading: boolean;
        children?: JSX.Element | JSX.Element[];
        className?: string;
        hideAddressBar?: boolean;
    }
    export default FiltersContainer;
}
declare module "renderer/scenes/HubScene/Meats/types" {
    export interface MeatProps {
        visible: boolean;
        sequence: number;
    }
}
declare module "renderer/pages/BrowserPage/BrowserBar" {
    import { Dispatch } from "common/types/index";
    interface Props {
        tab: string;
        dispatch: Dispatch;
        url: string;
        loading: boolean;
    }
    const _default_40: (props: Pick<Pick<Props, "tab">, never>) => JSX.Element;
    export default _default_40;
}
declare module "renderer/pages/common/Page" {
    const _default_41: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export default _default_41;
}
declare module "renderer/pages/CrashyPage" {
    import React from "react";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    export default class CrashyPage extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props extends MeatProps {
    }
}
declare module "renderer/basics/ErrorState" {
    const ErrorState: ({ error }: {
        error: Error;
    }) => JSX.Element;
    export default ErrorState;
}
declare module "renderer/basics/Floater" {
    export default function Floater(props: {
        tiny?: boolean;
    }): JSX.Element;
}
declare module "renderer/butlerd/invalidators" {
    import { RequestCreator } from "butlerd";
    import { ActionCreator } from "common/actions/index";
    type MessageType = RequestCreator<any, any>;
    export type ActionList = ActionCreator<any>[];
    export const invalidators: Map<MessageType, ActionList>;
}
declare module "renderer/hocs/butlerCaller/index" {
    import { RequestCreator } from "butlerd";
    export interface ButlerCallerArgs<Params, Result> {
        loading: boolean;
        error: Error;
        result: Result;
    }
    export function renderNoop(): JSX.Element;
    export const LoadingStateDiv: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    const butlerCaller: <Params, Result>(method: RequestCreator<Params, Result>) => any;
    export default butlerCaller;
}
declare module "renderer/pages/CavePage" {
    import { Dispatch } from "redux";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        caveId: string;
        actionName: string;
    }
    const _default_42: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_42;
}
declare module "renderer/pages/GamePage" {
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        gameId: number;
    }
    const _default_43: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_43;
}
declare module "renderer/pages/InstallPage" {
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        url: string;
        gameId: number;
    }
    const _default_44: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_44;
}
declare module "renderer/pages/FeaturedPage" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    class FeaturedPage extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
    }
    const _default_45: (props: Pick<Pick<React.ClassAttributes<FeaturedPage> & Props, "key" | "tab" | "ref" | "sequence" | "visible">, "key" | "ref" | "sequence" | "visible">) => JSX.Element;
    export default _default_45;
}
declare module "renderer/pages/common/ItemList" {
    const _default_46: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export default _default_46;
}
declare module "renderer/pages/PageStyles/games" {
    export const TitleBox: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const Title: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const TitleBreak: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const TitleSpacer: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const Desc: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
}
declare module "renderer/basics/Cover/GifMarker" {
    import React from "react";
    class GifMarker extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        label?: string | JSX.Element | JSX.Element[];
    }
    export default GifMarker;
}
declare module "renderer/helpers/getDisplayName" {
    function getDisplayName(Component: any): any;
    export default getDisplayName;
}
declare module "renderer/hocs/withHover" {
    import React from "react";
    export interface HoverState {
        hover: boolean;
    }
    export interface HoverProps {
        hover: boolean;
        onMouseEnter?: React.EventHandler<React.MouseEvent<any>>;
        onMouseLeave?: React.EventHandler<React.MouseEvent<any>>;
    }
    function withHover<ChildProps extends HoverProps>(Component: React.ComponentType<ChildProps>): {
        new (props: Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>, context: any): {
            onMouseEnter: () => void;
            onMouseLeave: () => void;
            render(): JSX.Element;
            context: any;
            setState<K extends "hover">(state: HoverState | ((prevState: Readonly<HoverState>, props: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>) => HoverState | Pick<HoverState, K>) | Pick<HoverState, K>, callback?: () => void): void;
            forceUpdate(callback?: () => void): void;
            readonly props: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<HoverState>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>, nextState: Readonly<HoverState>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>, prevState: Readonly<HoverState>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>, prevState: Readonly<HoverState>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>, nextState: Readonly<HoverState>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ChildProps, Exclude<keyof ChildProps, "onMouseEnter" | "onMouseLeave" | "hover">>>, nextState: Readonly<HoverState>, nextContext: any): void;
        };
        displayName: string;
        contextType?: React.Context<any>;
    };
    export default withHover;
}
declare module "renderer/basics/Cover/SmartImage" {
    import React from "react";
    class Image extends React.PureComponent<Props> {
        render(): JSX.Element;
        componentDidMount(): void;
        componentDidUpdate(props: Props, state: any, snapshot: Props): void;
        getSnapshotBeforeUpdate(prevProps: Props): Props;
    }
    interface Props {
        src?: string;
        className?: string;
        onLoadStart: () => void;
        onLoadEnd: () => void;
        onError: () => void;
    }
    const _default_47: import("styled-components").StyledComponent<typeof Image, {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export default _default_47;
}
declare module "renderer/basics/Cover/index" {
    import React from "react";
    import { HoverProps } from "renderer/hocs/withHover";
    import { Game } from "common/butlerd/messages";
    class Cover extends React.PureComponent<Props, State> {
        constructor(props: Cover["props"], context: any);
        render(): JSX.Element;
        onLoadStart: () => void;
        onLoadEnd: () => void;
        onError: () => void;
    }
    interface State {
        loading: boolean;
        error: boolean;
    }
    interface Props extends HoverProps {
        showGifMarker?: boolean;
        coverUrl?: string;
        stillCoverUrl?: string;
        onClick?: React.MouseEventHandler<HTMLDivElement>;
        onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
        className?: string;
        gameId: number;
        square?: boolean;
    }
    export default Cover;
    export const HoverCover: {
        new (props: Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">, context: any): {
            onMouseEnter: () => void;
            onMouseLeave: () => void;
            render(): JSX.Element;
            context: any;
            setState<K extends "hover">(state: import("renderer/hocs/withHover").HoverState | ((prevState: Readonly<import("renderer/hocs/withHover").HoverState>, props: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>) => import("renderer/hocs/withHover").HoverState | Pick<import("renderer/hocs/withHover").HoverState, K>) | Pick<import("renderer/hocs/withHover").HoverState, K>, callback?: () => void): void;
            forceUpdate(callback?: () => void): void;
            readonly props: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<import("renderer/hocs/withHover").HoverState>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>, nextState: Readonly<import("renderer/hocs/withHover").HoverState>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>, prevState: Readonly<import("renderer/hocs/withHover").HoverState>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>, prevState: Readonly<import("renderer/hocs/withHover").HoverState>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>, nextState: Readonly<import("renderer/hocs/withHover").HoverState>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Props, "coverUrl" | "stillCoverUrl" | "gameId" | "onClick" | "square" | "className" | "onContextMenu" | "showGifMarker">>, nextState: Readonly<import("renderer/hocs/withHover").HoverState>, nextContext: any): void;
        };
        displayName: string;
        contextType?: React.Context<any>;
    };
    export const GameCover: ({ game, showGifMarker, }: {
        game: Game;
        showGifMarker?: boolean;
    }) => JSX.Element;
}
declare module "renderer/pages/common/StandardSaleRibbon" {
    import { Game } from "common/butlerd/messages";
    const _default_48: ({ game }: {
        game: Game;
    }) => JSX.Element;
    export default _default_48;
}
declare module "renderer/basics/PlatformIcons/PlatformIcon" {
    import React from "react";
    import platformData, { PlatformHolder } from "common/constants/platform-data";
    export default class PlatformIcon extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        target: PlatformHolder;
        field: keyof typeof platformData;
        before?: React.ReactNode;
    }
}
declare module "renderer/basics/PlatformIcons/index" {
    import React from "react";
    import { PlatformHolder } from "common/constants/platform-data";
    class PlatformIcons extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default PlatformIcons;
    interface Props {
        target: PlatformHolder;
        className?: string;
        before?: () => JSX.Element;
    }
}
declare module "renderer/pages/common/StandardGameCover" {
    import React from "react";
    import { Game } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    export const standardCoverWidth: number;
    export const standardCoverHeight: number;
    class StandardGameCover extends React.PureComponent<Props> {
        render(): JSX.Element;
        onContextMenu: (ev: any) => void;
    }
    interface Props {
        dispatch: Dispatch;
        game: Game;
        showInfo?: boolean;
        className?: string;
        showGifMarker?: boolean;
        children?: JSX.Element | JSX.Element[];
    }
    const _default_49: import("react-redux").ConnectedComponent<typeof StandardGameCover, Pick<React.ClassAttributes<StandardGameCover> & Props, "game" | "key" | "ref" | "children" | "className" | "showGifMarker" | "showInfo">>;
    export default _default_49;
}
declare module "renderer/pages/common/GameStripe" {
    import { RequestCreator } from "butlerd";
    import { Game } from "common/butlerd/messages";
    import { Dispatch, LocalizedString } from "common/types/index";
    interface FetchRes<Item> {
        items: Item[];
    }
    interface GenericProps<Params, Item> {
        title: LocalizedString;
        href: string;
        params: Params;
        renderTitleExtras?: () => JSX.Element;
        getGame: (item: Item) => Game;
        dispatch: Dispatch;
        tab: string;
        sequence: number;
        linkId?: string;
    }
    export function makeGameStripe<Params, Res extends FetchRes<any>>(rc: RequestCreator<Params, Res>): ((props: Pick<Pick<GenericProps<Params, Res["items"][0]>, "tab" | "title" | "href" | "params" | "renderTitleExtras" | "getGame" | "linkId">, "title" | "href" | "params" | "renderTitleExtras" | "getGame" | "linkId">) => JSX.Element) & {
        getGameCallback?(f: (item: Res["items"][0]) => Game): (item: Res["items"][0]) => Game;
    };
    export function makeStripeCallbacks<Params, Res extends FetchRes<any>>(rc: RequestCreator<Params, Res>): {
        getGame(f: (item: Res["items"][0]) => Game): (item: Res["items"][0]) => Game;
    };
}
declare module "renderer/pages/common/ScanningIndicator" {
    import React from "react";
    class ScanningIndicator extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        progress: number | null;
    }
    const _default_50: import("react-redux").ConnectedComponent<typeof ScanningIndicator, Pick<React.ClassAttributes<ScanningIndicator> & Props, "key" | "ref">>;
    export default _default_50;
}
declare module "renderer/pages/LibraryPage/index" {
    import { Profile } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    class LibraryPage extends React.PureComponent<Props> {
        render(): JSX.Element;
        ownedGetGame: (item: import("common/butlerd/messages").DownloadKey) => import("common/butlerd/messages").Game;
        installedGetGame: (item: import("common/butlerd/messages").Cave) => import("common/butlerd/messages").Game;
        installedTitleExtras: () => JSX.Element;
        componentDidMount(): void;
    }
    interface Props extends MeatProps {
        profile: Profile;
        dispatch: Dispatch;
        tab: string;
    }
    const _default_51: (props: Pick<Pick<Pick<React.ClassAttributes<LibraryPage> & Props, "profile" | "key" | "tab" | "ref" | "sequence" | "visible">, "profile" | "key" | "ref" | "sequence" | "visible">, "key" | "ref" | "sequence" | "visible">) => JSX.Element;
    export default _default_51;
}
declare module "renderer/pages/common/SortsAndFilters" {
    import Icon from "renderer/basics/Icon";
    export const SortsAndFilters: import("styled-components").StyledComponent<"section", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const FilterGroup: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const FilterOptionLink: import("styled-components").StyledComponent<"a", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const FilterOptionButton: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const FilterOptionIcon: import("styled-components").StyledComponent<typeof Icon, {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const FilterSpacer: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
}
declare module "renderer/pages/common/Filter" {
    import { Dispatch, LocalizedString } from "common/types/index";
    interface FilterOptionProps {
        tab: string;
        dispatch: Dispatch;
        optionKey: string;
        optionValue: string;
        label: LocalizedString;
        active: boolean;
        url: string;
    }
    export const FilterOption: (props: Pick<Pick<FilterOptionProps, "tab" | "label" | "optionKey" | "optionValue">, "label" | "optionKey" | "optionValue">) => JSX.Element;
}
declare module "renderer/pages/common/CommonFilters" {
    export const FilterGroupGameClassification: () => JSX.Element;
    export const FilterGroupInstalled: () => JSX.Element;
}
declare module "renderer/pages/common/FilterInput" {
    import React from "react";
    interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    }
    const _default_52: (props: Props) => JSX.Element;
    export default _default_52;
}
declare module "renderer/pages/common/SearchControl" {
    import { Dispatch } from "common/types/index";
    import { IntlShape } from "react-intl";
    interface Props {
        tab: string;
        dispatch: Dispatch;
        intl: IntlShape;
        url: string;
        defaultValue: string;
    }
    const _default_53: (props: Pick<import("react-intl").WithIntlProps<Pick<Props, "tab" | "intl">>, "forwardedRef">) => JSX.Element;
    export default _default_53;
}
declare module "renderer/pages/common/Sort" {
    import { Dispatch, LocalizedString } from "common/types/index";
    interface SortOptionsProps {
        sortBy: string;
        label: LocalizedString;
        tab: string;
        dispatch: Dispatch;
        url: string;
        active: boolean;
        reverse: boolean;
    }
    export const SortOption: (props: Pick<Pick<SortOptionsProps, "tab" | "label" | "sortBy">, "label" | "sortBy">) => JSX.Element;
}
declare module "renderer/basics/GameStatusGetter" {
    import React from "react";
    import { GameStatus } from "common/helpers/get-game-status";
    import { Game } from "common/butlerd/messages";
    interface Props {
        game: Game;
        caveId?: string;
        render: (status: GameStatus) => JSX.Element;
        status: GameStatus;
    }
    const _default_54: React.ComponentType<Pick<Props, "game" | "caveId" | "render">>;
    export default _default_54;
}
declare module "renderer/basics/MainAction" {
    import { Game } from "common/butlerd/messages";
    import { GameStatus } from "common/helpers/get-game-status";
    import { Dispatch } from "common/types/index";
    import React from "react";
    class MainAction extends React.PureComponent<Props> {
        render(): JSX.Element;
        onClick: (e: React.MouseEvent<any>) => void;
    }
    interface Props {
        game: Game;
        caveId?: string;
        status: GameStatus;
        wide?: boolean;
        className?: string;
        iconOnly?: boolean;
        dispatch: Dispatch;
    }
    const _default_55: import("react-redux").ConnectedComponent<typeof MainAction, Pick<React.ClassAttributes<MainAction> & Props, "game" | "key" | "caveId" | "status" | "ref" | "className" | "wide" | "iconOnly">>;
    export default _default_55;
}
declare module "renderer/pages/common/StandardMainAction" {
    import { Game } from "common/butlerd/messages";
    const _default_56: ({ game }: {
        game: Game;
    }) => JSX.Element;
    export default _default_56;
}
declare module "renderer/basics/EmptyState" {
    import { LocalizedString } from "common/types/index";
    import React from "react";
    class EmptyState extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default EmptyState;
    interface Props {
        bigText: LocalizedString;
        icon: string;
        smallText?: LocalizedString;
        buttonIcon?: string;
        buttonText?: LocalizedString;
        buttonAction?: React.MouseEventHandler<HTMLDivElement>;
        componentAction?: JSX.Element;
        className?: string;
    }
}
declare module "renderer/series/Series" {
    import { RequestCreator } from "butlerd";
    import { Dispatch, LocalizedString } from "common/types/index";
    import React from "react";
    export interface FetchRes<Item> {
        items: Item[];
        nextCursor?: string;
    }
    export type RecordComponentProps<Item, Record, ExtraProps> = {
        item: Item;
        record: Record;
    } & ExtraProps;
    export interface BaseSeriesProps<Params, Item, Record> {
        label?: LocalizedString;
        params: Params;
        getRecord: (item: Item) => Record;
        getKey?: (item: Item) => any;
        renderMainFilters?: () => JSX.Element;
        renderExtraFilters?: () => JSX.Element;
    }
    interface GenericProps<Params, Item, Record, ExtraProps> extends BaseSeriesProps<Params, Item, Record> {
        fallbackGetKey?: (r: Record) => any;
        RecordComponent: React.ComponentType<RecordComponentProps<Item, Record, ExtraProps>>;
        extraProps: ExtraProps;
        dispatch: Dispatch;
        tab: string;
        sequence: number;
        restoredScrollTop: number;
    }
    export function makeSeries<Params, Res extends FetchRes<any>, Record, ExtraProps>(rc: RequestCreator<Params, Res>): (props: Pick<Pick<GenericProps<Params, Res["items"][0], Record, ExtraProps>, "tab" | "label" | "params" | "fallbackGetKey" | "getKey" | "getRecord" | "RecordComponent" | "extraProps" | "renderMainFilters" | "renderExtraFilters">, "label" | "params" | "fallbackGetKey" | "getKey" | "getRecord" | "RecordComponent" | "extraProps" | "renderMainFilters" | "renderExtraFilters">) => JSX.Element;
}
declare module "renderer/pages/PageStyles/boxes" {
    export const BaseBox: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const Box: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const BoxSingle: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const BoxInner: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
}
declare module "renderer/pages/common/StandardGameDesc" {
    import { Game } from "common/butlerd/messages";
    const StandardGameDesc: ({ game, children, }: {
        game: Game;
        children?: any;
    }) => JSX.Element;
    export default StandardGameDesc;
}
declare module "renderer/series/GameSeries" {
    import { FetchRes } from "renderer/series/Series";
    import { RequestCreator } from "butlerd";
    export default function makeGameSeries<Params, Res extends FetchRes<any>>(rc: RequestCreator<Params, Res>): any;
}
declare module "renderer/pages/LibraryPage/OwnedPage/index" {
    import { GameClassification, Profile } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        profile: Profile;
        tab: string;
        dispatch: Dispatch;
        sortBy: string;
        sortDir: string;
        search: string;
        classification: GameClassification;
        installed: boolean;
    }
    const _default_57: (props: Pick<Pick<Pick<Props, "profile" | "tab" | "sequence" | "visible">, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_57;
}
declare module "renderer/pages/LibraryPage/InstalledPage/index" {
    import { GameClassification } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        sortBy: string;
        sortDir: string;
        search: string;
        classification: GameClassification;
    }
    const _default_58: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_58;
}
declare module "renderer/pages/LocationsPage/LocationSizeBar" {
    import React from "react";
    import { InstallLocationSummary } from "common/butlerd/messages";
    export default class LocationSizeBar extends React.PureComponent<Props> {
        render(): JSX.Element | "Not available";
    }
    interface Props {
        location: InstallLocationSummary;
    }
}
declare module "renderer/pages/LocationsPage/LocationSummary" {
    import { InstallLocationSummary } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    class LocationSummary extends React.PureComponent<Props> {
        render(): JSX.Element;
        getGame: (item: import("common/butlerd/messages").Cave) => import("common/butlerd/messages").Game;
        renderTitleExtras: () => JSX.Element;
        onMoreActions: (e: React.MouseEvent<any>) => void;
    }
    interface Props {
        dispatch: Dispatch;
        location: InstallLocationSummary;
        numLocations: number;
    }
    const _default_59: import("react-redux").ConnectedComponent<typeof LocationSummary, Pick<React.ClassAttributes<LocationSummary> & Props, "key" | "ref" | "location" | "numLocations">>;
    export default _default_59;
}
declare module "renderer/pages/LocationsPage/index" {
    import { InstallLocationsListResult } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    class LocationsPage extends React.PureComponent<Props> {
        render(): JSX.Element;
        renderCallContents: any;
        renderList: (result: InstallLocationsListResult) => JSX.Element;
        onAddLocation: (ev: React.MouseEvent<any>) => void;
        componentDidMount(): void;
    }
    interface Props extends MeatProps {
        dispatch: Dispatch;
        tab: string;
        scanningLocations: boolean;
        locationScanProgress: number;
    }
    const _default_60: (props: Pick<Pick<React.ClassAttributes<LocationsPage> & Props, "key" | "tab" | "ref" | "sequence" | "visible">, "key" | "ref" | "sequence" | "visible">) => JSX.Element;
    export default _default_60;
}
declare module "renderer/basics/TotalPlaytime" {
    import { CaveSummary, Game } from "common/butlerd/messages";
    import React from "react";
    class TotalPlaytime extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default TotalPlaytime;
    interface Props {
        game: Game;
        cave: CaveSummary;
        short?: boolean;
        secondsRun?: number;
    }
}
declare module "renderer/basics/LastPlayed" {
    import { CaveSummary, Game } from "common/butlerd/messages";
    import React from "react";
    class LastPlayed extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default LastPlayed;
    interface Props {
        game: Game;
        cave: CaveSummary;
        short?: boolean;
        className?: string;
    }
}
declare module "renderer/pages/LocationPage/LocationItemExtras" {
    import React from "react";
    import { Cave } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import { GameStatus } from "common/helpers/get-game-status";
    class LocationItemExtras extends React.PureComponent<Props> {
        render(): JSX.Element;
        renderPlayStats: (status: GameStatus) => JSX.Element;
        onManage: () => void;
    }
    interface Props {
        cave: Cave;
        dispatch: Dispatch;
    }
    const _default_61: import("react-redux").ConnectedComponent<typeof LocationItemExtras, Pick<React.ClassAttributes<LocationItemExtras> & Props, "key" | "cave" | "ref">>;
    export default _default_61;
}
declare module "renderer/pages/LocationPage/LocationContents" {
    import { InstallLocationSummary } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    interface Props {
        location: InstallLocationSummary | null;
        tab: string;
        dispatch: Dispatch;
        sortBy: string;
        sortDir: string;
    }
    const _default_62: (props: Pick<Pick<Props, "tab" | "location">, "location">) => JSX.Element;
    export default _default_62;
}
declare module "renderer/pages/LocationPage/index" {
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        dispatch: Dispatch;
        tab: string;
        installLocationId: string;
        sortBy: string;
        sortDir: string;
    }
    const _default_63: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_63;
}
declare module "renderer/pages/BrowserPage/BrowserContext/BrowserContextConstants" {
    export const browserContextHeight = 110;
}
declare module "renderer/basics/GameStats" {
    import { Game } from "common/butlerd/messages";
    import { GameStatus } from "common/helpers/get-game-status";
    import React from "react";
    class GameStats extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default GameStats;
    interface Props {
        game: Game;
        status: GameStatus;
    }
}
declare module "renderer/pages/BrowserPage/BrowserContext/BrowserContextGame" {
    import { Game } from "common/butlerd/messages";
    import { GameStatus } from "common/helpers/get-game-status";
    import React from "react";
    import { Dispatch } from "redux";
    interface Props {
        game: Game;
        dispatch: Dispatch<any>;
        status: GameStatus;
    }
    const _default_64: React.ComponentType<Pick<Props, "game">>;
    export default _default_64;
}
declare module "renderer/pages/BrowserPage/BrowserContext/index" {
    import { Dispatch } from "common/types/index";
    interface Props {
        tab: string;
        dispatch: Dispatch;
        gameId: number;
        sequence: number;
    }
    const _default_65: (props: Pick<Pick<Props, "tab">, never>) => JSX.Element;
    export default _default_65;
}
declare module "renderer/pages/BrowserPage/DisabledBrowser" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    class DisabledBrowser extends React.PureComponent<Props> {
        render(): JSX.Element;
        onReenable: () => void;
    }
    interface Props {
        dispatch: Dispatch;
    }
    const _default_66: import("react-redux").ConnectedComponent<typeof DisabledBrowser, Pick<React.ClassAttributes<DisabledBrowser> & Props, "key" | "ref">>;
    export default _default_66;
}
declare module "renderer/pages/BrowserPage/index" {
    import { Dispatch, ProxySource } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        url: string;
        sleepy: boolean;
        loading: boolean;
        proxy: string;
        proxySource: ProxySource;
        disableBrowser: boolean;
        partition: string;
    }
    const _default_67: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_67;
}
declare module "renderer/pages/BrowserPage/newTabItems" {
    export const newTabPrimaryItems: {
        label: string[];
        icon: string;
        url: string;
    }[];
    export const newTabSecondaryItems: {
        label: string[];
        icon: string;
        url: string;
    }[];
}
declare module "renderer/pages/NewTabPage/index" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    class NewTabPage extends React.PureComponent<Props> {
        render(): JSX.Element;
        componentDidMount(): void;
    }
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
    }
    const _default_68: (props: Pick<Pick<React.ClassAttributes<NewTabPage> & Props, "key" | "tab" | "ref" | "sequence" | "visible">, "key" | "ref" | "sequence" | "visible">) => JSX.Element;
    export default _default_68;
}
declare module "renderer/pages/CollectionPage/index" {
    import { GameClassification, Profile } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        profile: Profile;
        dispatch: Dispatch;
        collectionId: number;
        sortBy: string;
        sortDir: string;
        search: string;
        filterClassification: GameClassification;
        filterInstalled: boolean;
    }
    const _default_69: (props: Pick<Pick<Pick<Props, "profile" | "tab" | "sequence" | "visible">, "profile" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_69;
}
declare module "renderer/pages/CollectionsPage/CollectionPreview" {
    import { Collection, Profile } from "common/butlerd/messages";
    const _default_70: (props: Pick<Props, "coll">) => JSX.Element;
    export default _default_70;
    interface Props {
        coll: Collection;
        profile: Profile;
    }
}
declare module "renderer/series/CollectionSeries" {
    import { RequestCreator } from "butlerd";
    import { FetchRes } from "renderer/series/Series";
    export default function makeCollectionSeries<Params, Res extends FetchRes<any>>(rc: RequestCreator<Params, Res>): any;
}
declare module "renderer/pages/CollectionsPage/index" {
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    import { Dispatch } from "common/types/index";
    import { Profile } from "common/butlerd/messages";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        profile: Profile;
        sortBy: string;
        sortDir: string;
        url: string;
        search: string;
    }
    const _default_71: (props: Pick<Pick<Pick<Props, "profile" | "tab" | "sequence" | "visible">, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_71;
}
declare module "renderer/basics/SelectRow" {
    import { LocalizedString } from "common/types/index";
    import React from "react";
    import { IntlShape } from "react-intl";
    export interface SelectOption {
        label: LocalizedString;
        value: string;
    }
    interface Props {
        options: SelectOption[];
        value?: string;
        onChange?(value: string): void;
        intl: IntlShape;
    }
    const _default_72: React.FC<import("react-intl").WithIntlProps<Props>> & {
        WrappedComponent: React.ComponentType<Props>;
    };
    export default _default_72;
}
declare module "renderer/pages/AppLogPage/Log" {
    import React from "react";
    class Log extends React.PureComponent<Props, State> {
        constructor(props: Log["props"], context: any);
        render(): JSX.Element;
        onLoadMore: () => void;
        tbody: HTMLElement;
        gotBody: (tbody: HTMLElement) => void;
        scrollDown(): void;
        scrollTop(): void;
        onChangeLevel: (value: string) => void;
        onJumpDown: () => void;
    }
    export default Log;
    interface State {
        level: string;
        maxLines: number;
    }
    interface Props {
        log: string;
        className?: string;
        extraControls?: JSX.Element;
    }
}
declare module "renderer/pages/AppLogPage/index" {
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        url: string;
        file?: string;
    }
    const _default_73: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_73;
}
declare module "renderer/pages/PageStyles/stats" {
    export const StatBox: import("styled-components").StyledComponent<"div", any, {}, never>;
    export const StatNumber: import("styled-components").StyledComponent<"div", any, {}, never>;
}
declare module "renderer/pages/DashboardPage/ProfileGameStats" {
    import { ProfileGame } from "common/butlerd/messages";
    const _default_74: ({ pg }: {
        pg: ProfileGame;
    }) => JSX.Element;
    export default _default_74;
}
declare module "renderer/pages/DashboardPage/index" {
    import { Profile } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        profile: Profile;
        tab: string;
        dispatch: Dispatch;
        sortBy: string;
        sortDir: string;
        search: string;
        visibility: string;
        paidStatus: string;
    }
    const _default_75: (props: Pick<Pick<Pick<Props, "profile" | "tab" | "sequence" | "visible">, "profile" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_75;
}
declare module "renderer/helpers/whenClickNavigates" {
    import { MouseEvent } from "react";
    export function doesEventMeanBackground(e: MouseEvent<any>): boolean;
    interface NavigationClickHandler {
        (opts: {
            background: boolean;
        }): void;
    }
    export function whenClickNavigates(e: MouseEvent<any>, f: NavigationClickHandler): void;
}
declare module "renderer/pages/DownloadsPage/GameUpdateRow" {
    import { GameUpdate } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    class GameUpdateRow extends React.PureComponent<Props> {
        render(): JSX.Element;
        onUpdate: () => void;
        onNavigate: (e: React.MouseEvent<any>) => void;
    }
    interface Props {
        update: GameUpdate;
        dispatch: Dispatch;
    }
    const _default_76: import("react-redux").ConnectedComponent<typeof GameUpdateRow, Pick<React.ClassAttributes<GameUpdateRow> & Props, "update" | "key" | "ref">>;
    export default _default_76;
}
declare module "renderer/basics/UploadIcon" {
    import { Upload } from "common/butlerd/messages";
    import React from "react";
    class UploadIcon extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default UploadIcon;
    interface Props {
        upload: Upload;
    }
}
declare module "renderer/pages/DownloadsPage/Chart" {
    import React from "react";
    class Chart extends React.PureComponent<Props> {
        render(): JSX.Element;
        renderContent: ({ width, height }: {
            width: number;
            height: number;
        }) => JSX.Element;
    }
    interface Props {
        data: number[];
    }
    export default Chart;
}
declare module "renderer/pages/DownloadsPage/Row" {
    import { Download } from "common/butlerd/messages";
    import { GameStatus } from "common/helpers/get-game-status";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { HoverProps } from "renderer/hocs/withHover";
    interface Props extends HoverProps {
        first?: boolean;
        finished?: boolean;
        item: Download;
        dispatch: Dispatch;
        status: GameStatus;
        speeds: number[];
        downloadsPaused: boolean;
    }
    const _default_77: {
        new (props: Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">, context: any): {
            onMouseEnter: () => void;
            onMouseLeave: () => void;
            render(): JSX.Element;
            context: any;
            setState<K extends "hover">(state: import("renderer/hocs/withHover").HoverState | ((prevState: Readonly<import("renderer/hocs/withHover").HoverState>, props: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>) => import("renderer/hocs/withHover").HoverState | Pick<import("renderer/hocs/withHover").HoverState, K>) | Pick<import("renderer/hocs/withHover").HoverState, K>, callback?: () => void): void;
            forceUpdate(callback?: () => void): void;
            readonly props: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<import("renderer/hocs/withHover").HoverState>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>, nextState: Readonly<import("renderer/hocs/withHover").HoverState>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>, prevState: Readonly<import("renderer/hocs/withHover").HoverState>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>, prevState: Readonly<import("renderer/hocs/withHover").HoverState>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>, nextState: Readonly<import("renderer/hocs/withHover").HoverState>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Pick<Props, "onMouseEnter" | "onMouseLeave" | "hover" | "item" | "first" | "finished">, "item" | "first" | "finished">>, nextState: Readonly<import("renderer/hocs/withHover").HoverState>, nextContext: any): void;
        };
        displayName: string;
        contextType?: React.Context<any>;
    };
    export default _default_77;
}
declare module "renderer/pages/DownloadsPage/index" {
    import { Download, GameUpdate } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    class DownloadsPage extends React.PureComponent<Props> {
        componentDidMount(): void;
        render(): JSX.Element;
        renderContents(): JSX.Element;
        visitFeatured: () => void;
        renderFirstItem(firstItem: Download): JSX.Element;
        renderQueuedItems(queuedItems: Download[]): JSX.Element;
        renderUpdates(): JSX.Element;
        renderControls(): JSX.Element;
        onTogglePause: () => void;
        renderRecentActivity(): JSX.Element;
        clearFinishedDownloads: () => void;
        onUpdateAll: () => void;
    }
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        items: Download[];
        finishedItems: Download[];
        updates: {
            [caveId: string]: GameUpdate;
        };
        updateCheckHappening: boolean;
        updateCheckProgress: number;
        downloadsPaused: boolean;
    }
    const _default_78: (props: Pick<Pick<React.ClassAttributes<DownloadsPage> & Props, "key" | "tab" | "ref" | "sequence" | "visible">, "key" | "ref" | "sequence" | "visible">) => JSX.Element;
    export default _default_78;
}
declare module "renderer/pages/PreferencesPage/BrothComponent" {
    import { PackageState } from "common/types/index";
    import React from "react";
    interface Props {
        name: string;
        pkg: PackageState;
    }
    const _default_79: React.ComponentType<Pick<Props, "name">>;
    export default _default_79;
}
declare module "renderer/pages/PreferencesPage/BrothComponents" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    class BrothComponents extends React.Component<Props> {
        render(): JSX.Element;
        checkForUpdates: () => void;
    }
    interface Props {
        dispatch: Dispatch;
        packageNames: string[];
    }
    const _default_80: import("react-redux").ConnectedComponent<typeof BrothComponents, Pick<React.ClassAttributes<BrothComponents> & Props, "key" | "ref">>;
    export default _default_80;
}
declare module "renderer/pages/PreferencesPage/Label" {
    import React from "react";
    class Label extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default Label;
    interface Props {
        active?: boolean;
        children?: JSX.Element | JSX.Element[];
        className?: string;
    }
}
declare module "renderer/pages/PreferencesPage/Checkbox" {
    import { Dispatch, PreferencesState } from "common/types/index";
    import React from "react";
    interface Props {
        name: keyof PreferencesState;
        label: string | JSX.Element;
        children?: any;
        dispatch: Dispatch;
        active: boolean;
    }
    const _default_81: React.ComponentType<Pick<Props, "label" | "name" | "children">>;
    export default _default_81;
}
declare module "renderer/pages/PreferencesPage/ProxySettings" {
    import { ProxySource } from "common/types/index";
    import React from "react";
    class ProxySettings extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        proxy: string;
        proxySource: ProxySource;
    }
    const _default_82: import("react-redux").ConnectedComponent<typeof ProxySettings, Pick<React.ClassAttributes<ProxySettings> & Props, "key" | "ref">>;
    export default _default_82;
}
declare module "renderer/pages/PreferencesPage/AdvancedSettings" {
    import { Dispatch, SystemState } from "common/types/index";
    import React from "react";
    class AdvancedSettings extends React.PureComponent<Props> {
        render(): JSX.Element;
        checkForGameUpdates: (e: React.MouseEvent<any>) => void;
        openAppLog: (e: React.MouseEvent<any>) => void;
        clearBrowsingData: (e: React.MouseEvent<any>) => void;
    }
    interface Props {
        dispatch: Dispatch;
        system: SystemState;
    }
    const _default_83: import("react-redux").ConnectedComponent<typeof AdvancedSettings, Pick<React.ClassAttributes<AdvancedSettings> & Props, "key" | "ref">>;
    export default _default_83;
}
declare module "renderer/pages/PreferencesPage/OpenAtLoginErrorMessage" {
    import { OpenAtLoginError } from "common/types/index";
    import React from "react";
    class OpenAtLoginErrorMessage extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        openAtLoginError: OpenAtLoginError;
    }
    const _default_84: import("react-redux").ConnectedComponent<typeof OpenAtLoginErrorMessage, Pick<React.ClassAttributes<OpenAtLoginErrorMessage> & Props, "key" | "ref">>;
    export default _default_84;
}
declare module "renderer/pages/PreferencesPage/BehaviorSettings" {
    import React from "react";
    class BehaviorSettings extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default BehaviorSettings;
    interface Props {
    }
}
declare module "renderer/basics/SimpleSelect/DefaultOptionComponent" {
    import React from "react";
    import { BaseOptionType } from "renderer/basics/SimpleSelect/index";
    export interface OptionComponentProps<OptionType> {
        option: OptionType;
    }
    export default class DefaultOptionComponent<OptionType extends BaseOptionType> extends React.PureComponent<OptionComponentProps<OptionType>> {
        render(): JSX.Element;
    }
}
declare module "renderer/basics/SimpleSelect/index" {
    import React from "react";
    import { OptionComponentProps } from "renderer/basics/SimpleSelect/DefaultOptionComponent";
    import { LocalizedString } from "common/types/index";
    export interface BaseOptionType {
        label: LocalizedString;
        value: any;
    }
    export const FloaterSpacer: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export default class SimpleSelect<OptionType extends BaseOptionType> extends React.PureComponent<Props<OptionType>, State<OptionType>> {
        constructor(props: Props<OptionType>, context: any);
        render(): JSX.Element;
        onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
        onKeyPress: (ev: React.KeyboardEvent<HTMLElement>) => void;
        renderOptions(): JSX.Element;
        onOptionClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
        onOptionMouseEnter: (ev: React.MouseEvent<HTMLDivElement>) => void;
        getValueForWrapper(el: HTMLElement): OptionType;
        onToggle: () => void;
        onBlur: () => void;
        open(): void;
        close(): void;
    }
    type OnChange<OptionType> = (value: OptionType) => void;
    interface Props<OptionType> {
        options: OptionType[];
        value: OptionType;
        onChange: OnChange<OptionType>;
        isLoading?: boolean;
        OptionComponent?: React.ComponentType<OptionComponentProps<OptionType>>;
        className?: string;
    }
    interface State<OptionType> {
        open: boolean;
        focusedValue: OptionType;
        search: string;
        lastSearchAt: number;
        lastKeyboardFocusAt: number;
    }
}
declare module "renderer/pages/PreferencesPage/LanguageSettings" {
    import { Dispatch, LocaleInfo, RootState } from "common/types/index";
    import React from "react";
    import { BaseOptionType } from "renderer/basics/SimpleSelect/index";
    class LanguageSettings extends React.PureComponent<Props> {
        render(): JSX.Element;
        queueLocaleDownload: (e: React.MouseEvent<any>) => void;
        onLanguageChange: (value: BaseOptionType) => void;
    }
    interface Props {
        dispatch: Dispatch;
        locales: LocaleInfo[];
        lang: string;
        sniffedLang: string;
        downloading: RootState["i18n"]["downloading"];
    }
    const _default_85: import("react-redux").ConnectedComponent<typeof LanguageSettings, Pick<React.ClassAttributes<LanguageSettings> & Props, "key" | "ref">>;
    export default _default_85;
}
declare module "renderer/pages/PreferencesPage/InstallLocationSettings" {
    import React from "react";
    import { Dispatch } from "common/types/index";
    class InstallLocationSettings extends React.Component<Props> {
        render(): JSX.Element;
        onManage: () => void;
    }
    interface Props {
        dispatch: Dispatch;
    }
    const _default_86: import("react-redux").ConnectedComponent<typeof InstallLocationSettings, Pick<React.ClassAttributes<InstallLocationSettings> & Props, "key" | "ref">>;
    export default _default_86;
}
declare module "renderer/pages/PreferencesPage/index" {
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
    }
    const _default_87: import("react-redux").ConnectedComponent<(props: Pick<Props, "dispatch" | "sequence" | "visible">) => JSX.Element, Pick<Pick<Props, "dispatch" | "sequence" | "visible">, "sequence" | "visible">>;
    export default _default_87;
}
declare module "renderer/basics/modal-styles" {
    export const ModalButtons: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const ModalButtonSpacer: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
}
declare module "renderer/pages/ScanInstallLocationsPage/index" {
    import { Game } from "common/butlerd/messages";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    enum Stage {
        Scanning = 0,
        NeedConfirm = 1,
        Done = 2
    }
    class ScanInstallLocations extends React.PureComponent<Props, State> {
        resolve: (val?: any) => void;
        reject: (e: Error) => void;
        constructor(props: Props, context: any);
        componentDidMount(): void;
        render(): JSX.Element;
        renderButtons(): JSX.Element;
        renderMainButton(): JSX.Element;
        renderStatus(): JSX.Element;
        renderScanning(): JSX.Element;
        renderNeedConfirm(): JSX.Element;
        onConfirm: () => void;
        onClose: () => void;
        renderDone(): JSX.Element;
        onShowLog: () => void;
        componentWillUnmount(): void;
    }
    interface Props extends MeatProps {
        dispatch: Dispatch;
        tab: string;
    }
    interface State {
        stage: Stage;
        progress: number;
        game: Game;
        games: Game[];
        numItems: number;
        didImport: boolean;
        log: string;
        showLog: boolean;
    }
    const _default_88: (props: Pick<Pick<React.ClassAttributes<ScanInstallLocations> & Props, "key" | "tab" | "ref" | "sequence" | "visible">, "key" | "ref" | "sequence" | "visible">) => JSX.Element;
    export default _default_88;
}
declare module "renderer/scenes/HubScene/Meats/Meat" {
    import { Dispatch } from "common/types/index";
    import { MeatProps } from "renderer/scenes/HubScene/Meats/types";
    interface Props extends MeatProps {
        tab: string;
        dispatch: Dispatch;
        url: string;
        isBrowser: boolean;
        internalPage: string;
        firstPathElement: string;
    }
    const _default_89: (props: Pick<Pick<Props, "tab" | "sequence" | "visible">, "sequence" | "visible">) => JSX.Element;
    export default _default_89;
}
declare module "renderer/scenes/HubScene/Meats/index" {
    import { Profile } from "common/butlerd/messages";
    import { Dispatch, TabInstances } from "common/types/index";
    import React from "react";
    class Meats extends React.PureComponent<Props> {
        render(): JSX.Element;
        onClick: (ev: React.MouseEvent<any>) => void;
    }
    interface Props {
        dispatch: Dispatch;
        /** current tab shown */
        tab: string;
        openTabs: string[];
        tabInstances: TabInstances;
        profile: Profile;
    }
    const _default_90: import("react-redux").ConnectedComponent<typeof Meats, Pick<React.ClassAttributes<Meats> & Props, "key" | "ref">>;
    export default _default_90;
}
declare module "renderer/scenes/HubScene/HubContent" {
    import { Profile } from "common/butlerd/messages";
    import React from "react";
    class HubContent extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props {
        profile: Profile;
    }
    const _default_91: import("react-redux").ConnectedComponent<typeof HubContent, Pick<React.ClassAttributes<HubContent> & Props, "key" | "ref">>;
    export default _default_91;
}
declare module "renderer/scenes/HubScene/Sidebar/Logo" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    class Logo extends React.PureComponent<Props> {
        render(): JSX.Element;
        onClick: (e: React.MouseEvent<any>) => void;
    }
    interface Props {
        dispatch: Dispatch;
        appVersion: string;
    }
    const _default_92: import("react-redux").ConnectedComponent<typeof Logo, Pick<React.ClassAttributes<Logo> & Props, "key" | "ref">>;
    export default _default_92;
}
declare module "renderer/scenes/HubScene/Sidebar/SearchResultsBar/GameSearchResult" {
    import { Game } from "common/butlerd/messages";
    import React from "react";
    import { Dispatch } from "common/types/index";
    import { Watcher } from "renderer/hocs/watching";
    class GameSearchResult extends React.PureComponent<Props> {
        subscribe(watcher: Watcher): void;
        componentDidUpdate(): void;
        render(): JSX.Element;
        onClick: (ev: React.MouseEvent<any>) => void;
        onEnter: (ev: React.MouseEvent<any>) => void;
        getNavigateAction(): import("common/types/index").Action<import("common/types/index").NavigatePayload>;
    }
    export type SetSearchHighlightFunc = (index: number) => void;
    interface Props {
        game: Game;
        chosen: boolean;
        active: boolean;
        loading: boolean;
        index: number;
        dispatch: Dispatch;
        setSearchHighlight: SetSearchHighlightFunc;
    }
    const _default_93: import("react-redux").ConnectedComponent<typeof GameSearchResult, Pick<React.ClassAttributes<GameSearchResult> & Props, "game" | "key" | "index" | "loading" | "ref" | "active" | "chosen" | "setSearchHighlight">>;
    export default _default_93;
}
declare module "renderer/scenes/HubScene/Sidebar/SearchResultsBar/index" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { Watcher } from "renderer/hocs/watching";
    import { SetSearchHighlightFunc } from "renderer/scenes/HubScene/Sidebar/SearchResultsBar/GameSearchResult";
    import { Game } from "common/butlerd/messages";
    class SearchResultsBar extends React.PureComponent<Props> {
        render(): JSX.Element;
        resultList: Element;
        onResultList: (el: Element) => void;
        onOpenAsTab: () => void;
        subscribe(watcher: Watcher): void;
        resultsGrid(games: Game[]): JSX.Element;
    }
    interface Props {
        open: boolean;
        highlight: number;
        query: string;
        games: Game[];
        example: string;
        loading: boolean;
        dispatch: Dispatch;
        setSearchHighlight: SetSearchHighlightFunc;
    }
    const _default_94: import("react-redux").ConnectedComponent<typeof SearchResultsBar, Pick<React.ClassAttributes<SearchResultsBar> & Props, "open" | "key" | "games" | "loading" | "ref" | "query" | "setSearchHighlight" | "highlight" | "example">>;
    export default _default_94;
}
declare module "renderer/scenes/HubScene/Sidebar/Search" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { IntlShape } from "react-intl";
    interface Props {
        profileId: number;
        dispatch: Dispatch;
        intl: IntlShape;
    }
    const _default_95: import("react-redux").ConnectedComponent<React.FC<import("react-intl").WithIntlProps<Props>> & {
        WrappedComponent: React.ComponentType<Props>;
    }, Pick<import("react-intl").WithIntlProps<Props>, "forwardedRef">>;
    export default _default_95;
}
declare module "renderer/scenes/HubScene/Sidebar/styles" {
    export const SidebarSection: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const SidebarHeading: import("styled-components").StyledComponent<"span", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
}
declare module "renderer/scenes/HubScene/Sidebar/Item" {
    import React from "react";
    import { LocalizedString, TabInstance } from "common/types/index";
    class Item extends React.PureComponent<Props> {
        onClick: (e: React.MouseEvent<HTMLElement>) => void;
        onMouseUp: (e: React.MouseEvent<HTMLElement>) => void;
        onCloseClick: (e: React.MouseEvent<any>) => void;
        render(): JSX.Element;
    }
    interface Props {
        tab: string;
        url: string;
        resource: string;
        label: LocalizedString;
        active: boolean;
        count?: number;
        sublabel?: LocalizedString;
        progress?: number;
        icon?: string;
        iconImage?: string;
        loading: boolean;
        onClick?: () => void;
        onClose?: () => void;
        onExplore?: (tabId: string) => void;
        tabInstance?: TabInstance;
    }
    export default Item;
}
declare module "renderer/scenes/HubScene/Sidebar/Tab" {
    import { Dispatch, DownloadsState, TabInstance } from "common/types/index";
    import React from "react";
    import { IntlShape } from "react-intl";
    interface Props {
        tab: string;
        index?: number;
        active: boolean;
        sortable?: boolean;
        tabInstance: TabInstance;
        downloads: DownloadsState | null;
        dispatch: Dispatch;
        intl: IntlShape;
    }
    const _default_96: React.FC<import("react-intl").WithIntlProps<Pick<Props, "tab" | "index" | "active" | "intl" | "sortable">>> & {
        WrappedComponent: React.ComponentType<Pick<Props, "tab" | "index" | "active" | "intl" | "sortable">>;
    };
    export default _default_96;
}
declare module "renderer/scenes/HubScene/Sidebar/PrimeDownload/GameTitle" {
    export const GameTitle: (props: {
        title: string;
    }) => JSX.Element;
}
declare module "renderer/scenes/HubScene/Sidebar/PrimeDownload/PrimeDownloadContents" {
    import { Game } from "common/butlerd/messages";
    import { Dispatch, ProgressInfo, TaskName } from "common/types/index";
    import React from "react";
    type Kind = "download" | "task" | "recent";
    class PrimeDownloadContents extends React.PureComponent<Props> {
        render(): JSX.Element;
        onMainClick: () => void;
        renderProgress(): JSX.Element;
        renderLastPlayed: any;
        onContextMenu: (ev: React.MouseEvent<any>) => void;
    }
    interface Props {
        game: Game;
        kind: Kind;
        taskName?: TaskName;
        caveId?: string;
        progress?: ProgressInfo;
        downloadsPaused: boolean;
        dispatch: Dispatch;
    }
    const _default_97: import("react-redux").ConnectedComponent<typeof PrimeDownloadContents, Pick<React.ClassAttributes<PrimeDownloadContents> & Props, "progress" | "game" | "key" | "caveId" | "ref" | "kind" | "taskName">>;
    export default _default_97;
}
declare module "renderer/scenes/HubScene/Sidebar/PrimeDownload/index" {
    import { Download, DownloadProgress } from "common/butlerd/messages";
    import { Dispatch, Task } from "common/types/index";
    import React from "react";
    class PrimeDownload extends React.PureComponent<Props> {
        render(): JSX.Element;
        renderGameForCave: any;
        renderGameForTask: any;
    }
    interface Props {
        task: Task;
        dispatch: Dispatch;
        download: Download;
        progress: DownloadProgress;
    }
    const _default_98: import("react-redux").ConnectedComponent<typeof PrimeDownload, Pick<React.ClassAttributes<PrimeDownload> & Props, "key" | "ref">>;
    export default _default_98;
}
declare module "renderer/scenes/HubScene/Sidebar/Sidebar" {
    import { User } from "common/butlerd/messages";
    import React from "react";
    import { Dispatch, LocalizedString } from "common/types/index";
    interface SortEndParams {
        oldIndex: number;
        newIndex: number;
    }
    class Sidebar extends React.PureComponent<Props, State> {
        constructor(props: Sidebar["props"], context?: any);
        closeAllTabs: () => void;
        newTab: () => void;
        onSortEnd: (params: SortEndParams) => void;
        render(): JSX.Element;
        renderTabs(): JSX.Element;
        renderShortcuts(): JSX.Element;
        renderShortcutsRest(): JSX.Element;
        renderLink(url: string, icon: string, label: LocalizedString): JSX.Element;
        static getDerivedStateFromProps(props: Props, state: State): Partial<State>;
    }
    interface Props {
        me: User;
        tab: string;
        openTabs: string[];
        enableTabs: boolean;
        url: string;
        dispatch: Dispatch;
    }
    interface State {
        openTabs: string[];
    }
    const _default_99: import("react-redux").ConnectedComponent<typeof Sidebar, Pick<React.ClassAttributes<Sidebar> & Props, "key" | "ref">>;
    export default _default_99;
}
declare module "renderer/scenes/HubScene/index" {
    import React from "react";
    class HubScene extends React.PureComponent {
        render(): JSX.Element;
    }
    export default HubScene;
}
declare module "renderer/App/Layout/index" {
    import { Profile } from "common/butlerd/messages";
    import React from "react";
    import { IntlShape } from "react-intl";
    /**
     * Top-level component in the app, decides which page to show
     * Also, subscribes to app store to synchronize its state
     */
    class Layout extends React.PureComponent<Props> {
        render(): JSX.Element;
        main(): JSX.Element;
        renderReactHint(): JSX.Element;
        renderReactHintContent: (target: any, content: any) => JSX.Element;
    }
    interface Props {
        ready: boolean;
        maximized: boolean;
        focused: boolean;
        profile: Profile;
        intl: IntlShape;
    }
    const _default_100: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<Layout> & Props, "key" | "ref" | "intl">>> & {
        WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<Layout> & Props, "key" | "ref" | "intl">>;
    };
    export default _default_100;
}
declare module "renderer/basics/Markdown" {
    import React from "react";
    class Markdown extends React.PureComponent<Props> {
        render(): JSX.Element;
        renderHTML(): {
            __html: any;
        };
    }
    export default Markdown;
    interface Props {
        source: string;
    }
}
declare module "renderer/basics/RowButton" {
    import React from "react";
    class RowButton extends React.PureComponent<Props, any> {
        render(): JSX.Element;
    }
    interface Props {
        className?: string;
        onClick?: React.MouseEventHandler<HTMLDivElement>;
        hint?: string;
        icon?: string;
        iconComponent?: JSX.Element;
        label?: JSX.Element | string;
        id?: string;
        ink?: boolean;
    }
    export default RowButton;
    export const BigButtonContent: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export const BigButtonRow: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export class Tag extends React.PureComponent<{}, {}> {
        render(): JSX.Element;
    }
}
declare module "renderer/modal-widgets/styles" {
    export const ModalWidgetDiv: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
}
declare module "renderer/modal-widgets/ClearBrowsingData" {
    import { ClearBrowsingDataParams, ClearBrowsingDataResponse } from "common/modals/types";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    class ClearBrowsingData extends React.PureComponent<Props, State> {
        constructor(props: ClearBrowsingData["props"], context?: any);
        componentDidMount(): void;
        change(state: Partial<State>): void;
        doUpdatePayload(state: State): void;
        toggleCache: () => void;
        toggleCookies: () => void;
        render(): JSX.Element;
    }
    interface Props extends ModalWidgetProps<ClearBrowsingDataParams, ClearBrowsingDataResponse> {
        userId: number;
    }
    interface State {
        fetchedCacheSize?: boolean;
        cacheSize?: number;
        clearCache?: boolean;
        clearCookies?: boolean;
    }
    const _default_101: import("react-redux").ConnectedComponent<typeof ClearBrowsingData, Pick<React.ClassAttributes<ClearBrowsingData> & Props, "key" | "ref" | "modal" | "updatePayload">>;
    export default _default_101;
}
declare module "renderer/modal-widgets/SwitchVersionCave/CustomDate" {
    import { DateFormat } from "common/format/datetime";
    import React from "react";
    import { IntlShape } from "react-intl";
    interface Props {
        date: Date | string;
        format?: DateFormat;
        intl: IntlShape;
    }
    const _default_102: React.FC<import("react-intl").WithIntlProps<Props>> & {
        WrappedComponent: React.ComponentType<Props>;
    };
    export default _default_102;
}
declare module "renderer/modal-widgets/SwitchVersionCave/index" {
    import { Build } from "common/butlerd/messages";
    import { ModalWidgetProps } from "common/modals/index";
    import { SwitchVersionCaveParams, SwitchVersionCaveResponse } from "common/modals/types";
    import { Dispatch } from "common/types/index";
    import React from "react";
    class SwitchVersionCave extends React.PureComponent<Props> {
        render(): JSX.Element;
        renderBuild(index: number, b: Build): JSX.Element;
        onClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
    }
    interface Props extends ModalWidgetProps<SwitchVersionCaveParams, SwitchVersionCaveResponse> {
        dispatch: Dispatch;
    }
    const _default_103: import("react-redux").ConnectedComponent<typeof SwitchVersionCave, Pick<React.ClassAttributes<SwitchVersionCave> & Props, "key" | "ref" | "modal" | "updatePayload">>;
    export default _default_103;
}
declare module "renderer/modal-widgets/ExploreJson" {
    import { ExploreJsonParams, ExploreJsonResponse } from "common/modals/types";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    class ExploreJson extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props extends ModalWidgetProps<ExploreJsonParams, ExploreJsonResponse> {
    }
    export default ExploreJson;
}
declare module "renderer/modal-widgets/ManageCave" {
    import { ManageCaveParams, ManageCaveResponse } from "common/modals/types";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    class ManageCave extends React.PureComponent<Props> {
        render(): JSX.Element;
        renderCave(): JSX.Element;
        onSwitchVersion: (ev: React.MouseEvent<HTMLElement>) => void;
        onBack: () => void;
        onUninstall: (ev: React.MouseEvent<HTMLElement>) => void;
        onReinstall: (ev: React.MouseEvent<HTMLElement>) => void;
        onUpdateCheck: (ev: React.MouseEvent<HTMLElement>) => void;
        onExplore: (ev: React.MouseEvent<HTMLElement>) => void;
    }
    interface Props extends ModalWidgetProps<ManageCaveParams, ManageCaveResponse> {
        dispatch: Dispatch;
    }
    const _default_104: import("react-redux").ConnectedComponent<typeof ManageCave, Pick<React.ClassAttributes<ManageCave> & Props, "key" | "ref" | "modal" | "updatePayload">>;
    export default _default_104;
}
declare module "renderer/modal-widgets/ManageGame" {
    import { ManageGameParams, ManageGameResponse } from "common/modals/types";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    class ManageGame extends React.PureComponent<Props> {
        render(): JSX.Element;
        onInstall: (ev: React.MouseEvent<HTMLElement>) => void;
        onManage: (ev: React.MouseEvent<HTMLElement>) => void;
    }
    interface Props extends ModalWidgetProps<ManageGameParams, ManageGameResponse> {
        dispatch: Dispatch;
    }
    const _default_105: import("react-redux").ConnectedComponent<typeof ManageGame, Pick<React.ClassAttributes<ManageGame> & Props, "key" | "ref" | "modal" | "updatePayload">>;
    export default _default_105;
}
declare module "renderer/modal-widgets/PlanInstall/select-common" {
    export const SelectValueDiv: import("styled-components").StyledComponent<"div", any, {}, never>;
}
declare module "renderer/modal-widgets/PlanInstall/InstallLocationOptionComponent" {
    import { InstallLocationSummary } from "common/butlerd/messages";
    import { LocalizedString } from "common/types/index";
    import { OptionComponentProps } from "renderer/basics/SimpleSelect/DefaultOptionComponent";
    export const InstallLocationOptionAdd = "_add";
    export interface InstallLocationOption {
        value: string;
        label: LocalizedString;
        location: InstallLocationSummary;
    }
    export default function InstallLocationOptionComponent(props: OptionComponentProps<InstallLocationOption>): JSX.Element;
}
declare module "renderer/modal-widgets/PlanInstall/UploadOptionComponent" {
    import { OptionComponentProps } from "renderer/basics/SimpleSelect/DefaultOptionComponent";
    import { Upload } from "common/butlerd/messages";
    export interface UploadOption {
        value: number;
        label: string;
        upload: Upload;
    }
    export default function UploadOptionComponent(props: OptionComponentProps<UploadOption>): JSX.Element;
}
declare module "renderer/modal-widgets/PlanInstall/index" {
    import { Game, InstallLocationSummary, InstallPlanInfo, Upload } from "common/butlerd/messages";
    import { ModalWidgetProps } from "common/modals/index";
    import { PlanInstallParams, PlanInstallResponse } from "common/modals/types";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { IntlShape } from "react-intl";
    import { Watcher } from "renderer/hocs/watching";
    import { InstallLocationOption } from "renderer/modal-widgets/PlanInstall/InstallLocationOptionComponent";
    import { UploadOption } from "renderer/modal-widgets/PlanInstall/UploadOptionComponent";
    enum PlanStage {
        Planning = 0
    }
    class PlanInstall extends React.PureComponent<Props, State> {
        constructor(props: Props, context: any);
        subscribe(watcher: Watcher): void;
        render(): JSX.Element;
        renderBody(): JSX.Element;
        renderPlanning(): JSX.Element;
        renderError(): JSX.Element;
        onShowError: () => void;
        renderBusy(): JSX.Element;
        renderSizes(): JSX.Element;
        onInstallLocationChange: (item: InstallLocationOption) => void;
        onUploadChange: (item: UploadOption) => void;
        close(): void;
        onCancel: (ev: React.MouseEvent<HTMLElement>) => void;
        onInstall: (ev: React.MouseEvent<HTMLElement>) => void;
        componentDidMount(): void;
        loadInstallLocations(): void;
        pickUpload(uploadId: number): void;
    }
    interface Props extends ModalWidgetProps<PlanInstallParams, PlanInstallResponse> {
        defaultInstallLocation: string;
        dispatch: Dispatch;
        intl: IntlShape;
    }
    interface State {
        stage: PlanStage;
        busy: boolean;
        gameId: number;
        game?: Game;
        uploads?: Upload[];
        info?: InstallPlanInfo;
        error?: Error;
        log?: string;
        installLocations: InstallLocationSummary[];
        pickedUploadId?: number;
        pickedInstallLocationId?: string;
    }
    const _default_106: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<PlanInstall> & Props, "key" | "ref" | "modal" | "intl" | "updatePayload">>> & {
        WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<PlanInstall> & Props, "key" | "ref" | "modal" | "intl" | "updatePayload">>;
    };
    export default _default_106;
}
declare module "renderer/modal-widgets/PrereqsState" {
    import { PrereqsStateParams, PrereqsStateResponse } from "common/modals/types";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    class PrereqsState extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props extends ModalWidgetProps<PrereqsStateParams, PrereqsStateResponse> {
    }
    export default PrereqsState;
}
declare module "renderer/modal-widgets/RecaptchaInput" {
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    import { RecaptchaInputParams, RecaptchaInputResponse } from "common/modals/types";
    class RecaptchaInput extends React.PureComponent<RecaptchaInputProps, State> {
        webview: Electron.WebviewTag;
        checker: number;
        constructor(props: RecaptchaInput["props"], context?: any);
        render(): JSX.Element;
        gotWebview: (wv: Electron.WebviewTag) => void;
        componentWillUnmount(): void;
        clearChecker(): void;
    }
    interface State {
        loaded: boolean;
    }
    interface RecaptchaInputProps extends ModalWidgetProps<RecaptchaInputParams, RecaptchaInputResponse> {
        params: RecaptchaInputParams;
        dispatch: Dispatch;
    }
    const _default_107: import("react-redux").ConnectedComponent<typeof RecaptchaInput, Pick<React.ClassAttributes<RecaptchaInput> & RecaptchaInputProps, "key" | "ref" | "modal" | "params" | "updatePayload">>;
    export default _default_107;
}
declare module "renderer/modal-widgets/SendFeedback" {
    import { ModalWidgetProps } from "common/modals/index";
    import { SendFeedbackParams, SendFeedbackResponse } from "common/modals/types";
    import { Dispatch, PackagesState } from "common/types/index";
    import React from "react";
    import { IntlShape } from "react-intl";
    enum ReportStage {
        Filling = 0,
        Uploading = 1,
        Done = 2,
        Failed = 3
    }
    class ReportIssue extends React.PureComponent<Props, State> {
        constructor(props: ReportIssue["props"], context: any);
        componentDidMount(): void;
        render(): JSX.Element;
        renderFilling(): JSX.Element;
        onTabSelected: (tabIndex: any) => void;
        onGoBack: () => void;
        onGoForward: () => void;
        onIncludeSystemInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
        renderUploading(): JSX.Element;
        renderDone(): JSX.Element;
        renderFailed(): JSX.Element;
        onViewReport: () => void;
        onSend: () => void;
        onBailOut: () => void;
        renderSystem: (input: any) => JSX.Element;
        onLearnMore: (ev: React.MouseEvent<any>) => void;
        onMessageChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    }
    interface Props extends ModalWidgetProps<SendFeedbackParams, SendFeedbackResponse> {
        intl: IntlShape;
        dispatch: Dispatch;
        brothPackages: PackagesState;
    }
    interface State {
        stage: ReportStage;
        message: string;
        system: any;
        includeSystemInfo: boolean;
        tabIndex: number;
        reportURL?: string;
        errorMessage?: string;
    }
    const _default_108: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<ReportIssue> & Props, "key" | "ref" | "modal" | "intl" | "updatePayload">>> & {
        WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<ReportIssue> & Props, "key" | "ref" | "modal" | "intl" | "updatePayload">>;
    };
    export default _default_108;
}
declare module "renderer/modal-widgets/SecretSettings" {
    import { SecretSettingsParams, SecretSettingsResponse } from "common/modals/types";
    import { Dispatch, RootState } from "common/types/index";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    class SecretSettings extends React.PureComponent<Props> {
        render(): JSX.Element;
        onReload: () => void;
        onReloadLocales: () => void;
        onViewAppState: () => Promise<void>;
        onGPUFeatureStatus: () => void;
        onBadButlerdCall: () => void;
        onDoubleTwice: () => void;
        onExpireAll: () => void;
        onOpenCrashy: () => void;
        onRestartButler: () => Promise<void>;
        toggleReduxLogging: () => void;
    }
    interface Props extends ModalWidgetProps<SecretSettingsParams, SecretSettingsResponse> {
        params: SecretSettingsParams;
        dispatch: Dispatch;
        status: RootState["status"];
    }
    const _default_109: import("react-redux").ConnectedComponent<typeof SecretSettings, Pick<React.ClassAttributes<SecretSettings> & Props, "key" | "ref" | "modal" | "params" | "updatePayload">>;
    export default _default_109;
}
declare module "renderer/modal-widgets/ShowError" {
    import { ShowErrorParams, ShowErrorResponse } from "common/modals/types";
    import { Dispatch } from "common/types/index";
    import React from "react";
    import { ModalWidgetProps } from "common/modals/index";
    class ShowError extends React.PureComponent<Props, State> {
        constructor(props: ShowError["props"], context?: any);
        render(): JSX.Element;
        renderGameStuff(): JSX.Element;
        renderErrorStuff(): JSX.Element;
        onClickGame: () => void;
        onSendReportChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    }
    interface Props extends ModalWidgetProps<ShowErrorParams, ShowErrorResponse> {
        dispatch: Dispatch;
    }
    interface State {
        sendReport: boolean;
    }
    const _default_110: import("react-redux").ConnectedComponent<typeof ShowError, Pick<React.ClassAttributes<ShowError> & Props, "key" | "ref" | "modal" | "updatePayload">>;
    export default _default_110;
}
declare module "renderer/modal-widgets/TwoFactorInput" {
    import { ModalWidgetProps } from "common/modals/index";
    import { TwoFactorInputParams, TwoFactorInputResponse } from "common/modals/types";
    import React from "react";
    import { Dispatch } from "common/types/index";
    import { IntlShape } from "react-intl";
    class TwoFactorInput extends React.PureComponent<Props, State> {
        input?: HTMLInputElement;
        constructor(props: Props, context: any);
        render(): JSX.Element;
        gotInput: (input: HTMLInputElement) => void;
        onKeyDown: (ev: React.KeyboardEvent<any>) => void;
        onChange: () => void;
        onContinue: () => void;
    }
    interface Props extends ModalWidgetProps<TwoFactorInputParams, TwoFactorInputResponse> {
        params: TwoFactorInputParams;
        intl: IntlShape;
        dispatch: Dispatch;
    }
    interface State {
        valid: boolean;
    }
    const _default_111: React.FC<import("react-intl").WithIntlProps<Pick<React.ClassAttributes<TwoFactorInput> & Props, "key" | "ref" | "modal" | "params" | "intl" | "updatePayload">>> & {
        WrappedComponent: React.ComponentType<Pick<React.ClassAttributes<TwoFactorInput> & Props, "key" | "ref" | "modal" | "params" | "intl" | "updatePayload">>;
    };
    export default _default_111;
}
declare module "renderer/modal-widgets/ConfirmQuit" {
    import { ModalWidgetProps } from "common/modals/index";
    import { ConfirmQuitParams, ConfirmQuitResponse } from "common/modals/types";
    import React from "react";
    export default class ConfirmQuit extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    interface Props extends ModalWidgetProps<ConfirmQuitParams, ConfirmQuitResponse> {
    }
}
declare module "renderer/modal-widgets/index" {
    import { modals, ModalWidgetProps } from "common/modals/index";
    type ModalRegistry = typeof modals;
    type ModalWidgetRegistry = {
        [K in keyof ModalRegistry]: React.ComponentType<ModalWidgetProps<ModalRegistry[K]["params"], ModalRegistry[K]["response"]> & any>;
    } & {
        [key: string]: React.ComponentType<any>;
    };
    export const modalWidgets: ModalWidgetRegistry;
}
declare module "renderer/App/Modals" {
    import { Dispatch, Modal } from "common/types/index";
    import React from "react";
    import { IntlShape } from "react-intl";
    interface Props {
        modal: Modal;
        intl: IntlShape;
        dispatch: Dispatch;
    }
    const _default_112: import("react-redux").ConnectedComponent<React.FC<import("react-intl").WithIntlProps<Props>> & {
        WrappedComponent: React.ComponentType<Props>;
    }, Pick<import("react-intl").WithIntlProps<Props>, "forwardedRef">>;
    export default _default_112;
}
declare module "renderer/global-styles/reset" {
    const _default_113: import("styled-components").FlattenSimpleInterpolation;
    export default _default_113;
}
declare module "renderer/global-styles/base" {
    const _default_114: import("styled-components").FlattenSimpleInterpolation;
    export default _default_114;
}
declare module "renderer/global-styles/scroll" {
    const _default_115: import("styled-components").FlattenSimpleInterpolation;
    export default _default_115;
}
declare module "renderer/global-styles/hint" {
    const _default_116: import("styled-components").FlattenSimpleInterpolation;
    export default _default_116;
}
declare module "renderer/global-styles/index" {
    const _default_117: import("styled-components").GlobalStyleComponent<{}, {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }>;
    export default _default_117;
}
declare module "renderer/App/AppContents" {
    import "!style-loader!css-loader!../fonts/icomoon/style.css";
    import "!style-loader!css-loader!../fonts/lato/latofonts-custom.css";
    import "!style-loader!css-loader!react-hint/css/index.css";
    import "!style-loader!css-loader!react-json-inspector/json-inspector.css";
    import "!style-loader!css-loader!react-tabs/style/react-tabs.css";
    import { Dispatch } from "common/types/index";
    import React from "react";
    class AppContents extends React.PureComponent<Props> {
        render(): JSX.Element;
        onClickCapture: (e: React.MouseEvent<HTMLElement>) => void;
        handleClickCapture(e: React.MouseEvent<HTMLElement>, target: HTMLElement): void;
    }
    interface Props {
        dispatch: Dispatch;
    }
    const _default_118: import("react-redux").ConnectedComponent<typeof AppContents, Pick<React.ClassAttributes<AppContents> & Props, "key" | "ref">>;
    export default _default_118;
}
declare module "renderer/App/index" {
    import React from "react";
    class App extends React.PureComponent<Props, State> {
        constructor(props: App["props"], context?: any);
        render(): JSX.Element;
        logProfile: (id: any, phase: any, actualTime: any, baseTime: any, startTime: any, commitTime: any) => void;
        realRender(): JSX.Element;
        static getDerivedStateFromProps(props: App["props"], state: App["state"]): App["state"];
    }
    interface Props {
        locale: string;
        localeMessages: {
            [id: string]: string;
        };
        fallbackMessages: {
            [id: string]: string;
        };
    }
    interface State {
        messages: {
            [id: string]: string;
        };
        localeVersion: number;
        locale: string;
        localeMessages: {
            [id: string]: string;
        };
        fallbackMessages: {
            [id: string]: string;
        };
    }
    const _default_119: import("react-redux").ConnectedComponent<typeof App, Pick<React.ClassAttributes<App> & Props, "key" | "ref">>;
    export default _default_119;
}
declare module "renderer/index" { }
declare module "renderer/basics/RandomSvg" {
    import React from "react";
    interface Props {
        seed?: number;
    }
    class RandomSvg extends React.PureComponent<Props> {
        render(): JSX.Element;
    }
    export default RandomSvg;
}
declare module "renderer/pages/DashboardPage/DraftStatus" {
    const _default_120: import("styled-components").StyledComponent<"div", {
        baseColors: {
            codGray: string;
            darkMineShaft: string;
            lightMineShaft: string;
            zambezi: string;
            silverChalice: string;
            swissCoffee: string;
            ivory: string;
            flushMahogany: string;
            mintJulep: string;
            gossip: string;
            shamrock: string;
            amber: string;
            heliotrope: string;
            carnation: string;
            vividTangerine: string;
        };
        fontSizes: {
            small: string;
            sidebar: string;
            smaller: string;
            baseText: string;
            modal: string;
            large: string;
            larger: string;
            huge: string;
            huger: string;
            enormous: string;
        };
        borderRadii: {
            explanation: string;
        };
        widths: {
            searchSidebar: string;
            handle: string;
            gridItem: string;
        };
        accent: string;
        lightAccent: string;
        error: string;
        warning: string;
        success: string;
        buy: string;
        sale: string;
        bundle: string;
        explanation: string;
        meatBackground: string;
        itemBackground: string;
        baseBackground: string;
        baseText: string;
        inputBackground: string;
        inputFocusedBackground: string;
        inputSelectedBackground: string;
        inputText: string;
        inputPlaceholder: string;
        inputBorder: string;
        inputBorderFocused: string;
        inputTextShadow: string;
        inputBoxShadow: string;
        inputBoxShadowFocused: string;
        sidebarBackground: string;
        sidebarBorder: string;
        sidebarEntryFocusedBackground: string;
        dropdownBackground: string;
        secondaryText: string;
        secondaryTextHover: string;
        ternaryText: string;
        breadBackground: string;
        breadBoxShadow: string;
        filterBackground: string;
        filterBorder: string;
        filterTagBorder: string;
        filterTagBackground: string;
        filterTagText: string;
        tooltipBackground: string;
        tooltipText: string;
        prefBorder: string;
        priceNormal: string;
        priceSale: string;
        windowBorder: string;
    }, {}, never>;
    export default _default_120;
}
