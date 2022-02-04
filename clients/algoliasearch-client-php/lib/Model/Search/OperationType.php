<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * OperationType Class Doc Comment
 *
 * @category Class
 * @description Type of operation to perform (move or copy).
 *
 * @package  Algolia\AlgoliaSearch
 */
class OperationType
{
    /**
     * Possible values of this enum
     */
    const MOVE = 'move';

    const COPY = 'copy';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::MOVE,
            self::COPY,
        ];
    }
}

