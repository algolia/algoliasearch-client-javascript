<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Anchoring Class Doc Comment
 *
 * @category Class
 * @description Whether the pattern parameter must match the beginning or the end of the query string, or both, or none.
 *
 * @package Algolia\AlgoliaSearch
 */
class Anchoring
{
    /**
     * Possible values of this enum
     */
    const IS = 'is';

    const STARTS_WITH = 'startsWith';

    const ENDS_WITH = 'endsWith';

    const CONTAINS = 'contains';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::IS,
            self::STARTS_WITH,
            self::ENDS_WITH,
            self::CONTAINS,
        ];
    }
}

