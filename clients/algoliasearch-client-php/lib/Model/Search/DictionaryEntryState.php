<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * DictionaryEntryState Class Doc Comment
 *
 * @category Class
 * @description The state of the dictionary entry.
 *
 * @package Algolia\AlgoliaSearch
 */
class DictionaryEntryState
{
    /**
     * Possible values of this enum
     */
    const ENABLED = 'enabled';

    const DISABLED = 'disabled';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::ENABLED,
            self::DISABLED,
        ];
    }
}

