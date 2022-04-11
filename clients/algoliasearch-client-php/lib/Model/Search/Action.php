<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Action Class Doc Comment
 *
 * @category Class
 * @description type of operation.
 *
 * @package Algolia\AlgoliaSearch
 */
class Action
{
    /**
     * Possible values of this enum
     */
    const ADD_OBJECT = 'addObject';

    const UPDATE_OBJECT = 'updateObject';

    const PARTIAL_UPDATE_OBJECT = 'partialUpdateObject';

    const PARTIAL_UPDATE_OBJECT_NO_CREATE = 'partialUpdateObjectNoCreate';

    const DELETE_OBJECT = 'deleteObject';

    const DELETE = 'delete';

    const CLEAR = 'clear';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::ADD_OBJECT,
            self::UPDATE_OBJECT,
            self::PARTIAL_UPDATE_OBJECT,
            self::PARTIAL_UPDATE_OBJECT_NO_CREATE,
            self::DELETE_OBJECT,
            self::DELETE,
            self::CLEAR,
        ];
    }
}

