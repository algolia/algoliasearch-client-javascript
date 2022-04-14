<?php

namespace Algolia\AlgoliaSearch\Model\QuerySuggestions;

/**
 * LogLevel Class Doc Comment
 *
 * @category Class
 * @description type of the record, can be one of three values (INFO, SKIP or ERROR).
 *
 * @package Algolia\AlgoliaSearch
 */
class LogLevel
{
    /**
     * Possible values of this enum
     */
    const INFO = 'INFO';

    const SKIP = 'SKIP';

    const ERROR = 'ERROR';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::INFO,
            self::SKIP,
            self::ERROR,
        ];
    }
}

