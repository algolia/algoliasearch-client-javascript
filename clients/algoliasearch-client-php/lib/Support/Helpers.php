<?php

namespace Algolia\AlgoliaSearch\Support;

final class Helpers
{
    /**
     * When building a query string, array values must be json_encoded.
     * This function can be used to turn any array into a Algolia-valid query string.
     *
     * Do not use a typical implementation where ['key' => ['one', 'two']] is
     * turned into key[1]=one&key[2]=two. Algolia will not understand key[x].
     * It should be turned into key=['one','two'] (before being url_encoded).
     *
     * @return string The urlencoded query string to send to Algolia
     */
    public static function buildQuery(array $args)
    {
        if (!$args) {
            return '';
        }

        $args = array_map(function ($value) {
            if (is_array($value)) {
                return json_encode($value);
            } elseif (is_bool($value)) {
                return $value ? 'true' : 'false';
            }

            return $value;
        }, $args);

        return http_build_query($args);
    }

    /**
     * Wrapper for json_decode that throws when an error occurs.
     *
     * This function is extracted from Guzzlehttp/Guzzle package which is not
     * compatible with PHP 5.3 so the client cannot always use it.
     *
     * @param string $json  JSON data to parse
     * @param bool   $assoc when true, returned objects will be converted
     *                      into associative arrays
     * @param int    $depth user specified recursion depth
     *
     * @throws \InvalidArgumentException if the JSON cannot be decoded
     *
     * @return mixed
     *
     * @see http://www.php.net/manual/en/function.json-decode.php
     */
    public static function json_decode($json, $assoc = false, $depth = 512)
    {
        $data = \json_decode($json, $assoc, $depth);
        if (JSON_ERROR_NONE !== json_last_error()) {
            throw new \InvalidArgumentException('json_decode error: '.json_last_error_msg());
        }

        return $data;
    }
}
