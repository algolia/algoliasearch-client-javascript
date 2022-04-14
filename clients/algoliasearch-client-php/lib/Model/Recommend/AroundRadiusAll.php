<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * AroundRadiusAll Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class AroundRadiusAll
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

