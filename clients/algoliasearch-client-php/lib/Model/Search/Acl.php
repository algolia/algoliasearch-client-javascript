<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Acl Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class Acl
{
    /**
     * Possible values of this enum
     */
    const ADD_OBJECT = 'addObject';

    const ANALYTICS = 'analytics';

    const BROWSE = 'browse';

    const DELETE_OBJECT = 'deleteObject';

    const DELETE_INDEX = 'deleteIndex';

    const EDIT_SETTINGS = 'editSettings';

    const LIST_INDEXES = 'listIndexes';

    const LOGS = 'logs';

    const PERSONALIZATION = 'personalization';

    const RECOMMENDATION = 'recommendation';

    const SEARCH = 'search';

    const SEE_UNRETRIEVABLE_ATTRIBUTES = 'seeUnretrievableAttributes';

    const SETTINGS = 'settings';

    const USAGE = 'usage';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::ADD_OBJECT,
            self::ANALYTICS,
            self::BROWSE,
            self::DELETE_OBJECT,
            self::DELETE_INDEX,
            self::EDIT_SETTINGS,
            self::LIST_INDEXES,
            self::LOGS,
            self::PERSONALIZATION,
            self::RECOMMENDATION,
            self::SEARCH,
            self::SEE_UNRETRIEVABLE_ATTRIBUTES,
            self::SETTINGS,
            self::USAGE,
        ];
    }
}

