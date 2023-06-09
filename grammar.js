module.exports = grammar({
  name: 'sv',

  rules: {
    // A.1 Source text

    // A.1.1 Library source text
    // TODO: Library source text is not very common, so not a priority.

    // A.1.2 SystemVerilog source text
    source_text: ($) => seq(optional($.timeunits_declaration), $.description),

    //TODO: starting with just module declaration and maybe interfaces/packages as well.
    description: ($) =>
      choice(
        $.module_declaration
        // $.udp_declaration,
        // $.interface_declaration,
        // $.program_declaration,
        // $.package_declaration
        // { attribute_instance } package_item
        // | { attribute_instance } bind_directive
        // $.config_declaration
      ),

    module_nonansi_header: ($) =>
      seq(
        repeat($.attribute_instance),
        $.module_keyword,
        optional($.lifetime),
        $.module_identifier,
        repeat($.package_import_declaration),
        optional($.parameter_port_list),
        $.list_of_port_declarations,
        ';'
      ),

    module_ansi_header: ($) =>
      seq(
        repeat($.attribute_instance),
        $.module_keyword,
        optional($.lifetime),
        $.module_identifier,
        repeat($.package_import_declaration),
        optional($.parameter_port_list),
        $.list_of_ports,
        ';'
      ),

    module_declaration: ($) =>
      choice(
        seq(
          $.module_nonansi_header,
          optional($.timeunits_declaration),
          repeat($.module_item),
          'endmodule',
          optional(seq(':', $.module_identifier))
        ),
        seq(
          $.module_ansi_header,
          optional($.timeunits_declaration),
          repeat($.non_port_module_item),
          'endmodule',
          optional(seq(':', $.module_identifier))
        ),
        seq(
          repeat($.attribute_instance),
          $.module_keyword,
          optional($.lifetime),
          $.module_identifier,
          '(',
          '.',
          '*',
          ')',
          ';',
          optional($.timeunits_declaration),
          repeat($.module_item),
          'endmodule',
          repeat(seq(':', $.module_identifier))
        ),
        seq('extern', $.module_nonansi_header),
        seq('extern', $.module_ansi_header)
      ),

    module_keyword: () => choice('module', 'macromodule'),

    timeunits_declaration: ($) =>
      choice(
        seq('timeunit', $.time_literal, repeat(seq('/', $.time_literal)), ';'),
        seq('timeprecision', $.time_literal, ';'),
        seq(
          'timeunit',
          $.time_literal,
          ';',
          'timeprecision',
          $.time_literal,
          ';'
        ),
        seq(
          'timeprecision',
          $.time_literal,
          ';',
          'timeunit',
          $.time_literal,
          ';'
        )
      ),

    // A.1.3 Module parameters and ports
    parameter_port_list: ($) =>
      choice(
        seq(
          '#',
          '(',
          $.list_of_param_assignments,
          repeat(seq(',', $.parameter_port_declaration)),
          ')'
        ),
        seq(
          '#',
          '(',
          $.parameter_port_declaration,
          repeat(seq(',', $.parameter_port_declaration)),
          ')'
        ),
        seq('#', '(', ')')
      ),

    parameter_port_declaration: ($) =>
      choice(
        $.parameter_port_declaration,
        $.local_parameter_declaration,
        seq($.data_type, $.list_of_param_assignments),
        seq('type', $.list_of_type_assignments)
      ),

    list_of_ports: ($) => seq('(', $.port, repeat(seq(',', $.port)), ')'),

    list_of_port_declarations: ($) =>
      seq(
        '(',
        optional(
          seq(
            repeat($.attribute_instance),
            $.ansi_port_declaration,
            repeat(
              seq(',', repeat($.attribute_instance), $.ansi_port_declaration)
            )
          )
        ),
        ')'
      ),

    port: ($) =>
      choice(
        optional($.port_expression),
        seq('.', $.port_identifier, '(', optional($.port_expression), ')')
      ),

    port_expression: ($) =>
      choice(
        optional($.port_expression),
        seq('.', $.port_identifier, '(', optional($.port_expression))
      ),

    port_reference: ($) => seq($.port_identifier, $.constant_select),

    port_direction: () => choice('input', 'output', 'inout', 'ref'),

    net_port_header: ($) => seq(optional($.port_direction), $.net_port_type),

    variable_port_header: ($) => seq(optional($.port_direction), $.variable_port_type),

    interface_port_header: ($) => 
      choice(
        seq($.interface_port_header, optional(seq('.', $.modport_identifier))),
        seq('interface', optional(seq('.', $.modport_identifier)))
      ),

    ansi_port_declaration: ($) =>
      choice(
        seq(
          optional(choice($.net_port_header, $.interface_port_header)),
          $.port_identifier,
          repeat($.unpacked_dimension),
          optional(seq('=', $.constant_expression))
        ),
        seq(
          optional($.variable_port_header),
          $.port_identifier,
          repeat($.variable_dimension),
          repeat(seq('=', $.constant_expression))
        ),
        seq(
          optional($.port_direction),
          '.',
          $.port_identifier,
          '(',
          optional($.expression),
          ')'
        )
      ),

    // A1.4 Module items
    module_item: ($) =>
      choice(seq($.port_declaration, ';'), $.non_port_module_item),

    non_port_module_item: ($) =>
      choice(
        $.generate_region,
        $.module_or_generate_item,
        $.specify_block,
        seq(repeat($.attribute_instance), $.specparam_declaration),
        $.program_declaration,
        $.module_declaration,
        $.interface_declaration,
        $.timeunits_declaration
      ),

    attribute_instance: ($) =>
      seq('(*', $.attr_spec, repeat(seq(',', $.attr_spec)), '*)'),
    attr_spec: ($) =>
      seq($.attr_name, optional(seq('=', $.constant_expression))),
    attr_name: () => $identifier,

    identifier: ($) => choice($.simple_identifier, escaped_identifier),

    simple_identifier: () => seq(/[a-zA-Z]/, repeat(/[a-zA-Z0-9_$]/)),

    // A2 Declarations

    // A2.1.1 Module parameter declarations
    local_parameter_declaration: ($) =>
      choice(
        seq('localparam', $.data_type_or_implicit, $.list_of_param_assignments),
        seq('localparam', 'type', $.list_of_type_assignments)
      ),

    // A2.1.3 Type declarations
    package_import_declaration: () =>
      seq(
        'import',
        $.package_import_item,
        repeat(seq(',', $.package_import_item)),
        ';'
      ),

    lifetime: () => choice('static', 'automatic'),

    // A.2.2 Declaration data types
    //
    // A.2.2.1 Net and variable types
    casting_type: ($) =>
      choice($.simple_type, $.constant_primary, $.signing, 'string', 'const'),

    data_type: ($) =>
      choice(
        seq(
          $.integer_vector_type,
          optional($.signing),
          repeat($.packed_dimension)
        ),
        seq($.integer_atom_type, optional($.signing)),
        $.non_integer_type,
        seq(
          $.struct_union,
          optional('packed', optional($.signing)),
          '{',
          $.struct_union_member,
          repeat($.struct_union_member),
          '}',
          repeat($.packed_dimension)
        ),
        seq(
          'enum',
          optional($.enum_base_type),
          '{',
          $.enum_name_declaration,
          repeat(seq(',', $.enum_name_declaration)),
          '}',
          repeat($.packed_dimension)
        ),
        'string',
        'chandle',
        seq(
          'virtual',
          optional('interface'),
          $.interface_identifier,
          optional($.parameter_value_assignment),
          optional(seq('.', $.modport_identifier))
        ),
        seq(
          optional(choice($.class_scope, $.package_scope)),
          $.type_identifier,
          repeat($.packed_dimension)
        ),
        $.class_type,
        'event',
        $.ps_covergroup_identifier,
        $.type_reference
      ),

    net_type: () => choice('supply0', 'supply1', 'tri', 'triand', 'trior', 'trireg', 'tri0', 'tri1', 'uwire', 'wire', 'wand', 'wor'),
    
    net_port_type: ($) => 
      choice(
        seq(
          optional($.net_type),
          $.data_type_or_implicit
        ),
        $.net_type_identifier,
        seq('interconnect', $.implicit_data_type)
      ),

    variable_port_type: ($) => $.var_data_type,

    var_data_type: ($) => 
      choice($.data_type, seq('var', $.data_type_or_implicit)),

    signing: () => choice('signed', 'unsigned'),

    // A2.3 Declaration lists
    list_of_param_assignments: ($) =>
      seq($.param_assignment, repeat(seq(',', $.param_assignment))),

    list_of_type_assignments: ($) =>
      seq($.type_assignment, repeat(seq(',', $.type_assignment))),

    // A.2.5 Declaration ranges
    unpacked_dimension: ($) => 
      choice(
        seq('[', $.constant_range, ']'),
        seq('[', $.constant_expression, ']')
      ),

    packed_dimension: ($) => 
      choice(
        seq('[', $.constant_range, ']'),
        $.unsized_dimension
      ),

    variable_dimension: ($) => 
      choice(
        $.unsized_dimension,
        $.unpacked_dimension,
        $.associative_dimension,
        $.queue_dimension
      ),

    // A.8.3 Expressions
    constant_expression: ($) => 
      choice(
        $.constant_primary,
        seq(
          $.unary_operator,
          repeat($.attribute_instance),
          $.constant_primary
        ),
        seq(
          $.constant_expression,
          $.binary_operator,
          repeat($.attribute_instance),
          $.constant_expression
        ),
        seq(
          $.constant_expression,
          '?',
          repeat($.attribute_instance), 
          $.constant_expression,
          ':',
          $.constant_expression
        )
      ),

    // A.8.4 Primaries
    time_literal: ($) =>
      choice(
        seq($.unsigned_number, $.time_unit),
        seq($.fixed_point_number, $.time_unit)
      ),

    time_unit: () => choice('s', 'ms', 'us', 'ns', 'ps', 'fs'),

    constant_select: ($) => 
      seq(
        optional(
          seq( 
            repeat( seq('.', $.member_identifier, $.constant_bit_select)),
            '.',
            $.member_identifier
            )),
        $.constant_bit_select,
        optional(seq('[', $.constant_part_select_range, ']'))
      ),

    // A.8.7 Numbers
    fixed_point_number: ($) => seq($.unsigned_number, '.', $.unsigned_number),

    unsigned_number: ($) =>
      seq($.decimal_digit, repeat(choice('_', $.decimal_digit))),

    decimal_digit: () => /[0-9]/,

    // A.9.3 Identifiers
    index_variable_identifier: ($) => $.identifier,
    interface_identifier: ($) => $.identifier,
    interface_instance_identifier: ($) => $.identifier,
    inout_port_identifier: ($) => $.identifier,
    input_port_identifier: ($) => $.identifier,
    instance_identifier: ($) => $.identifier,
    library_identifier: ($) => $.identifier,
    member_identifier: ($) => $.identifier,
    method_identifier: ($) => $.identifier,
    modport_identifier: ($) => $.identifier,
    module_identifier: ($) => $.identifier,
    port_identifier: ($) => $.identifier,
  },
})
