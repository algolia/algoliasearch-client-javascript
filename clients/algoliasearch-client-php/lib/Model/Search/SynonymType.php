<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * SynonymType Class Doc Comment
 *
 * @category Class
 * @description Type of the synonym object.
 *
 * @package Algolia\AlgoliaSearch
 */
class SynonymType
{
    /**
     * Possible values of this enum
     */
    const SYNONYM = 'synonym';

    const ONEWAYSYNONYM = 'onewaysynonym';

    const ALTCORRECTION1 = 'altcorrection1';

    const ALTCORRECTION2 = 'altcorrection2';

    const PLACEHOLDER = 'placeholder';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::SYNONYM,
            self::ONEWAYSYNONYM,
            self::ALTCORRECTION1,
            self::ALTCORRECTION2,
            self::PLACEHOLDER,
        ];
    }
}

