<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * BuiltInOperationType Class Doc Comment
 *
 * @category Class
 * @description The operation to apply on the attribute.
 *
 * @package Algolia\AlgoliaSearch
 */
class BuiltInOperationType
{
    /**
     * Possible values of this enum
     */
    const INCREMENT = 'Increment';

    const DECREMENT = 'Decrement';

    const ADD = 'Add';

    const REMOVE = 'Remove';

    const ADD_UNIQUE = 'AddUnique';

    const INCREMENT_FROM = 'IncrementFrom';

    const INCREMENT_SET = 'IncrementSet';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::INCREMENT,
            self::DECREMENT,
            self::ADD,
            self::REMOVE,
            self::ADD_UNIQUE,
            self::INCREMENT_FROM,
            self::INCREMENT_SET,
        ];
    }
}

