<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * ScopeType Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class ScopeType
{
    /**
     * Possible values of this enum
     */
    const SETTINGS = 'settings';

    const SYNONYMS = 'synonyms';

    const RULES = 'rules';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::SETTINGS,
            self::SYNONYMS,
            self::RULES,
        ];
    }
}

