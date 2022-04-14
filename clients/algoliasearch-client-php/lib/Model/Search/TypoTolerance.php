<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * TypoTolerance Class Doc Comment
 *
 * @category Class
 * @description Controls whether typo tolerance is enabled and how it is applied.
 *
 * @package Algolia\AlgoliaSearch
 */
class TypoTolerance
{
    /**
     * Possible values of this enum
     */
    const TRUE = 'true';

    const FALSE = 'false';

    const MIN = 'min';

    const STRICT = 'strict';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::TRUE,
            self::FALSE,
            self::MIN,
            self::STRICT,
        ];
    }
}

