<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * MultipleQueriesStrategy Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class MultipleQueriesStrategy
{
    /**
     * Possible values of this enum
     */
    const NONE = 'none';

    const STOP_IF_ENOUGH_MATCHES = 'stopIfEnoughMatches';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::NONE,
            self::STOP_IF_ENOUGH_MATCHES,
        ];
    }
}

