<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * AdvancedSyntaxFeatures Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class AdvancedSyntaxFeatures
{
    /**
     * Possible values of this enum
     */
    const EXACT_PHRASE = 'exactPhrase';

    const EXCLUDE_WORDS = 'excludeWords';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::EXACT_PHRASE,
            self::EXCLUDE_WORDS,
        ];
    }
}

