<?php

namespace Algolia\AlgoliaSearch\Model\Analytics;

/**
 * OrderBy Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class OrderBy
{
    /**
     * Possible values of this enum
     */
    const SEARCH_COUNT = 'searchCount';

    const CLICK_THROUGH_RATE = 'clickThroughRate';

    const CONVERSION_RATE = 'conversionRate';

    const AVERAGE_CLICK_POSITION = 'averageClickPosition';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::SEARCH_COUNT,
            self::CLICK_THROUGH_RATE,
            self::CONVERSION_RATE,
            self::AVERAGE_CLICK_POSITION,
        ];
    }
}

