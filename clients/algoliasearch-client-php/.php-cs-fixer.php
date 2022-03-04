<?php

$config = new PhpCsFixer\Config();

return $config
    ->setUsingCache(true)
    ->setRules([
        'array_syntax' => [ 'syntax' => 'short' ],
        'blank_line_after_namespace' => false,
        'blank_line_after_opening_tag' => true,
        'blank_line_before_statement' => true,
        'braces' => false,
        'cast_spaces' => true,
        'combine_consecutive_unsets' => true,
        'echo_tag_syntax' => true,
        'general_phpdoc_tag_rename' => true,
        'mb_str_functions' => true,
        'no_blank_lines_after_class_opening' => true,
        'no_empty_phpdoc' => true,
        'no_empty_statement' => true,
        'no_extra_blank_lines' => true,
        'no_multiline_whitespace_around_double_arrow' => true,
        'no_short_bool_cast' => true,
        'no_trailing_whitespace' => true,
        'no_trailing_whitespace_in_comment' => true,
        'no_unneeded_control_parentheses' => true,
        'no_unreachable_default_argument_value' => true,
        'no_unused_imports' => true,
        'no_useless_else' => true,
        'no_useless_return' => true,
        'no_whitespace_before_comma_in_array' => true,
        'no_whitespace_in_blank_line' => true,
        'normalize_index_brace' => true,
        'not_operator_with_space' => false,
        'object_operator_without_whitespace' => true,
        'ordered_imports' => true,
        'phpdoc_annotation_without_dot' => true,
        'phpdoc_inline_tag_normalizer' => true,
        'phpdoc_order' => true,
        'phpdoc_scalar' => true,
        'phpdoc_separation' => true,
        'phpdoc_single_line_var_spacing' => true,
        'phpdoc_tag_type' => true,
        'protected_to_private' => true,
        '@PSR2' => true,
        'short_scalar_cast' => true, 
        'single_blank_line_at_eof' => false,
        'single_blank_line_before_namespace' => true,
        'single_quote' => true,
        'space_after_semicolon' => true,
        'standardize_not_equals' => true,
        'strict_comparison' => true,
        'strict_param' => true,
        'ternary_operator_spaces' => true,
        'trailing_comma_in_multiline' => true,
        'trim_array_spaces' => true,
    ])
    ->setFinder(
        PhpCsFixer\Finder::create()
        ->exclude('test')
        ->exclude('tests')
        ->in(__DIR__)
    );
