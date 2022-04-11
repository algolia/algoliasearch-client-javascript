<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * AroundRadiusOneOf Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class AroundRadiusOneOf
{
    /**
     * Possible values of this enum
     */
    const ALL = 'all';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::ALL,
        ];
    }
}

