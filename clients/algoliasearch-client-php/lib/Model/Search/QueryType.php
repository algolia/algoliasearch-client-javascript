<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * QueryType Class Doc Comment
 *
 * @category Class
 * @description Controls if and how query words are interpreted as prefixes.
 *
 * @package Algolia\AlgoliaSearch
 */
class QueryType
{
    /**
     * Possible values of this enum
     */
    const PREFIX_LAST = 'prefixLast';

    const PREFIX_ALL = 'prefixAll';

    const PREFIX_NONE = 'prefixNone';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::PREFIX_LAST,
            self::PREFIX_ALL,
            self::PREFIX_NONE,
        ];
    }
}

