<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * RemoveWordsIfNoResults Class Doc Comment
 *
 * @category Class
 * @description Selects a strategy to remove words from the query when it doesn&#39;t match any hits.
 *
 * @package Algolia\AlgoliaSearch
 */
class RemoveWordsIfNoResults
{
    /**
     * Possible values of this enum
     */
    const NONE = 'none';

    const LAST_WORDS = 'lastWords';

    const FIRST_WORDS = 'firstWords';

    const ALL_OPTIONAL = 'allOptional';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::NONE,
            self::LAST_WORDS,
            self::FIRST_WORDS,
            self::ALL_OPTIONAL,
        ];
    }
}

