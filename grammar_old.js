const { attach } = require('neovim')

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

    list_of_ports: ($) =>
      seq('(', optional($.port), repeat(seq(',', optional($.port))), ')'),

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

    port_declaration: ($) =>
      choice(
        seq(repeat($.attribute_instance), $.inout_declaration),
        seq(repeat($.attribute_instance), $.input_declaration),
        seq(repeat($.attribute_instance), $.output_declaration),
        seq(repeat($.attribute_instance), $.ref_declaration),
        seq(repeat($.attribute_instance), $.interface_port_declaration)
      ),

    port: ($) =>
      choice(
        $.port_expression,
        seq('.', $.port_identifier, '(', optional($.port_expression), ')')
      ),

    port_expression: ($) =>
      choice(
        $.port_reference,
        seq('{', $.port_reference, repeat(seq(',', $.port_reference)), '}')
      ),

    port_reference: ($) => seq($.port_identifier, $.constant_select),

    port_direction: () => choice('input', 'output', 'inout', 'ref'),

    net_port_header: ($) => seq(optional($.port_direction), $.net_port_type),

    variable_port_header: ($) =>
      seq(optional($.port_direction), $.variable_port_type),

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

    // A.1.4 Module items
    elaboration_system_task: ($) =>
      choice(
        seq(
          '$fatal',
          optional(
            seq(
              '(',
              $.finish_number,
              optional(seq(',', $.list_of_arguments)),
              ')'
            )
          ),
          ';'
        ),
        seq(
          '$error',
          optional(seq('(', optional($.list_of_arguments), ')')),
          ';'
        ),
        seq(
          '$warning',
          optional(seq('(', optional($.list_of_arguments), ')')),
          ';'
        ),
        seq(
          '$info',
          optional(seq('(', optional($.list_of_arguments), ')')),
          ';'
        )
      ),

    finish_number: () => /[0-2]/,

    module_common_item: ($) =>
      choice(
        $.module_or_generate_item_declaration
        // $.interface_instantiation,
        // $.program_instantiation,
        // $.assertion_item,
        // $.bind_directive,
        // $.continuous_assign,
        // $.net_alias,
        // $.initial_construct,
        // $.final_construct,
        // $.always_construct,
        // $.loop_generate_construct,
        // $.conditional_generate_construct,
        // $.elaboration_system_task
      ),

    module_item: ($) =>
      choice(seq($.port_declaration, ';'), $.non_port_module_item),

    module_or_generate_item: ($) =>
      choice(
        seq(repeat($.attribute_instance), $.parameter_override),
        // seq(repeat($.attribute_instance), $.gate_instantiation),
        // seq(repeat($.attribute_instance), $.udp_instantiation),
        // seq(repeat($.attribute_instance), $.module_instantiation),
        seq(repeat($.attribute_instance), $.module_common_item)
      ),

    module_or_generate_item_declaration: ($) =>
      choice(
        $.package_or_generate_item_declaration,
        $.genvar_declaration
        // $.clocking_declaration
        // seq('default', 'clocking', $.clocking_identifier, ';'),
        // seq('default', 'disable', 'iff', $.expression_or_dist, ';')
      ),

    non_port_module_item: ($) =>
      choice(
        $.generate_region,
        $.module_or_generate_item,
        // $.specify_block,
        // seq(repeat($.attribute_instance), $.specparam_declaration),
        // $.program_declaration,
        $.module_declaration,
        // $.interface_declaration,
        $.timeunits_declaration
      ),

    parameter_override: ($) =>
      seq('defparam', $.list_of_defparam_assignments, ';'),

    //TODO: bind_directive, bidn_target_scope, etc.

    simple_identifier: () => seq(/[a-zA-Z]/, repeat(/[a-zA-Z0-9_$]/)),

    interface_or_generate_item: ($) =>
      choice(
        seq(repeat($.attribute_instance), $.module_common_item)
        // seq(repeat($.attribute_instance), $.extern_tf_declaration)
      ),

    // A.1.9 Class items
    random_qualifier: () => choice('rand', 'randc'),

    // A.1.10 Constraints
    identifier_list: ($) => seq($.identifier, repeat(seq(',', $.identifier))),

    // A.1.11 Package items

    package_item: ($) =>
      choice(
        $.package_or_generate_item_declaration,
        // $.anonymous_program,
        $.package_export_declaration,
        $.timeunits_declaration
      ),

    package_or_generate_item_declaration: ($) =>
      choice(
        // $.net_declaration,
        $.data_declaration,
        // $.task_declaration,
        // $.function_declaration,
        // $.checker_declaration,
        // $.dpi_import_export,
        // $.extern_constraint_declaration,
        // $.class_declaration,
        // $.class_constructor_declaration,
        seq($.local_parameter_declaration, ';'),
        seq($.parameter_declaration, ';'),
        // $.covergroup_declaration,
        // $.assertion_item_declaration,
        ';'
      ),

    // A.2 Declarations

    // A.2.1.1 Module parameter declarations
    local_parameter_declaration: ($) =>
      choice(
        seq('localparam', $.data_type_or_implicit, $.list_of_param_assignments),
        seq('localparam', 'type', $.list_of_type_assignments)
      ),

    parameter_declaration: ($) =>
      choice(
        seq('parameter', $.data_type_or_implicit, $.list_of_param_assignments),
        seq('parameter', 'type', $.list_of_type_assignments)
      ),

    // specparam_declaration: ($) =>
    //   seq(
    //     'specparam',
    //     optional($.packed_dimension),
    //     $.list_of_specparam_assignments
    //   ),

    // A.2.1.2 Port declarations
    inout_declaration: ($) =>
      choice(seq('inout', $.net_port_type, $.list_of_port_identifiers)),

    input_declaration: ($) =>
      choice(
        seq('input', $.net_port_type, $.list_of_port_identifiers),
        seq('input', $.variable_port_type, $.list_of_variable_identifiers)
      ),

    output_declaration: ($) =>
      choice(
        seq('output', $.net_port_type, $.list_of_port_identifiers),
        seq('output', $.variable_port_type, $.list_of_variable_identifiers)
      ),

    interface_port_declaration: ($) =>
      choice(
        seq($.interface_identifier, $.list_of_interface_identifiers),
        seq(
          $.interface_identifier,
          '.',
          $.modport_identifier,
          $.list_of_interface_identifiers
        )
      ),

    ref_declaration: ($) =>
      seq('ref', $.variable_port_type, $.list_of_variable_identifiers),

    // A.2.1.3 Type declarations
    data_declaration: ($) =>
      choice(
        seq(
          optional('const'),
          optional('var'),
          optional($.lifetime),
          $.data_type_or_implicit,
          $.list_of_variable_decl_assignments,
          ';'
        )
      ),

    package_import_declaration: ($) =>
      seq(
        'import',
        $.package_import_item,
        repeat(seq(',', $.package_import_item)),
        ';'
      ),

    package_import_item: ($) =>
      choice(
        seq($.package_identifier, '::', $.identifier),
        seq($.package_identifier, '::', '*')
      ),

    package_export_declaration: ($) =>
      choice(
        seq('export', '*::*', ';'),
        seq(
          'export',
          $.package_import_item,
          repeat(seq(',', $.package_import_item)),
          ';'
        )
      ),

    genvar_declaration: ($) => seq('genvar', $.list_of_genvar_identifiers, ';'),

    lifetime: () => choice('static', 'automatic'),

    // A.2.2 Declaration data types

    // A.2.2.1 Net and variable types
    casting_type: ($) =>
      choice(
        $.simple_type,
        // $.constant_primary,
        $.signing,
        'string',
        'const'
      ),

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
          optional(seq('packed', optional($.signing))),
          '{',
          $.struct_union_member,
          repeat($.struct_union_member),
          '}',
          repeat($.packed_dimension)
        ),
        // seq(
        //   'enum',
        //   optional($.enum_base_type),
        //   '{',
        //   $.enum_name_declaration,
        //   repeat(seq(',', $.enum_name_declaration)),
        //   '}',
        //   repeat($.packed_dimension)
        // ),
        'string',
        'chandle',
        seq(
          'virtual',
          optional('interface'),
          $.interface_identifier,
          optional($.parameter_value_assignment),
          optional(seq('.', $.modport_identifier))
        ),
        // seq(
        //   optional(choice($.class_scope, $.package_scope)),
        //   $.type_identifier,
        //   repeat($.packed_dimension)
        // ),
        // $.class_type,
        'event',
        // $.ps_covergroup_identifier,
        $.type_reference
      ),

    data_type_or_implicit: ($) => choice($.data_type, $.implicit_data_type),

    implicit_data_type: ($) =>
      seq(optional($.signing), repeat($.packed_dimension)),

    integer_type: ($) => choice($.integer_vector_type, $.integer_atom_type),

    integer_atom_type: () =>
      choice('byte', 'shortint', 'int', 'longint', 'integer', 'time'),

    integer_vector_type: () => choice('bit', 'logic', 'reg'),

    non_integer_type: () => choice('shortreal', 'real', 'realtime'),

    net_type: () =>
      choice(
        'supply0',
        'supply1',
        'tri',
        'triand',
        'trior',
        'trireg',
        'tri0',
        'tri1',
        'uwire',
        'wire',
        'wand',
        'wor'
      ),

    net_port_type: ($) =>
      choice(
        seq(optional($.net_type), $.data_type_or_implicit),
        $.net_type_identifier,
        seq('interconnect', $.implicit_data_type)
      ),

    variable_port_type: ($) => $.var_data_type,

    var_data_type: ($) =>
      choice($.data_type, seq('var', $.data_type_or_implicit)),

    signing: () => choice('signed', 'unsigned'),

    simple_type: ($) =>
      choice(
        $.integer_type,
        $.non_integer_type
        // $.ps_type_identifier,
        // $.ps_parameter_identifier
      ),

    struct_union_member: ($) =>
      seq(
        repeat($.attribute_instance),
        optional($.random_qualifier),
        $.data_type_or_void,
        $.list_of_variable_decl_assignments,
        ';'
      ),

    data_type_or_void: ($) => choice($.data_type, 'void'),

    struct_union: () => choice('struct', 'union', optional('tagged')),

    type_reference: ($) =>
      choice(
        seq('type', '(', $.expression, ')'),
        seq('type', '(', $.data_type, ')')
      ),

    // A.2.3 Declaration lists
    list_of_defparam_assignments: ($) =>
      seq($.defparam_assignment, repeat(seq(',', $.defparam_assignment))),

    list_of_genvar_identifiers: ($) =>
      seq($.genvar_identifier, repeat(seq(',', $.genvar_identifier))),

    list_of_interface_identifiers: ($) =>
      seq(
        $.interface_identifier,
        repeat($.unpacked_dimension),
        repeat(seq(',', $.interface_identifier, repeat($.unpacked_dimension)))
      ),

    list_of_net_decl_assignments: ($) =>
      seq($.net_decl_assignment, repeat(seq(',', $.net_decl_assignment))),

    list_of_param_assignments: ($) =>
      seq($.param_assignment, repeat(seq(',', $.param_assignment))),

    list_of_port_identifiers: ($) =>
      seq(
        $.port_identifier,
        repeat($.unpacked_dimension),
        repeat(seq(',', $.port_identifier, repeat($.unpacked_dimension)))
      ),

    // list_of_udp_port_identifiers: ($) =>
    //   seq($.udp_port_identifier, repeat(seq(',', $.udp_port_identifier))),

    // list_of_specparam_assignments: ($) =>
    //   seq($.specparam_assignment, repeat(seq(',', $.specparam_assignment))),

    list_of_tf_variable_identifiers: ($) =>
      seq(
        $.port_identifier,
        repeat($.variable_dimension),
        optional(seq('=', $.expression)),
        repeat(
          seq(
            ',',
            $.port_identifier,
            repeat($.variable_dimension),
            optional(seq('=', $.expression))
          )
        )
      ),

    list_of_type_assignments: ($) =>
      seq($.type_assignment, repeat(seq(',', $.type_assignment))),

    list_of_variable_decl_assignments: ($) =>
      seq(
        $.variable_decl_assignment,
        repeat(seq(',', $.variable_decl_assignment))
      ),

    list_of_variable_identifiers: ($) =>
      seq(
        $.variable_identifier,
        repeat($.variable_dimension),
        repeat(seq(',', $.variable_identifier, repeat($.variable_dimension)))
      ),

    list_of_variable_port_identifiers: ($) =>
      seq(
        $.variable_identifier,
        repeat($.variable_dimension),
        optional(seq('=', $.constant_expression)),
        repeat(
          seq(
            ',',
            $.variable_identifier,
            repeat($.variable_dimension),
            optional(seq('=', $.constant_expression))
          )
        )
      ),

    // A.2.4 Declaration assignments
    defparam_assignment: ($) =>
      seq(
        $.hierarchical_parameter_identifier,
        '=',
        $.constant_mintypmax_expression
      ),

    net_decl_assignment: ($) =>
      seq(
        $.net_identifier,
        repeat($.unpacked_dimension),
        optional(seq('=', $.expression))
      ),

    param_assignment: ($) =>
      seq(
        $.parameter_identifier,
        repeat($.unpacked_dimension),
        optional(seq('=', $.constant_param_expression))
      ),

    type_assignment: ($) =>
      choice($.type_identifier, optional(seq('=', $.data_type))),

    variable_decl_assignment: ($) =>
      choice(
        seq(
          $.variable_identifier,
          repeat($.variable_dimension),
          optional(seq('=', $.expression))
        )
        //TODO: add dynamic array and class indentifiers
      ),

    // A.2.5 Declaration ranges
    unpacked_dimension: ($) =>
      choice(
        seq('[', $.constant_range, ']'),
        seq('[', $.constant_expression, ']')
      ),

    packed_dimension: ($) =>
      choice(seq('[', $.constant_range, ']'), $.unsized_dimension),

    associative_dimension: ($) =>
      choice(seq('[', $.constant_range, ']'), seq('[', '*', ']')),

    variable_dimension: ($) =>
      choice(
        $.unsized_dimension,
        $.unpacked_dimension,
        $.associative_dimension,
        $.queue_dimension
      ),

    queue_dimension: ($) =>
      seq('[', '$', optional(seq(':', $.constant_expression)), ']'),

    unsized_dimension: () => seq('[', ']'),

    // A.4 Instantiations

    // A.4.1 Instantiation

    // A.4.1.1 Module instantiation
    module_instantiation: ($) =>
      seq(
        $.module_identifier,
        optional($.parameter_value_assignment),
        $.hierarchical_instance,
        repeat(seq(',', $.hierarchical_instance)),
        ';'
      ),

    parameter_value_assignment: ($) =>
      seq('#', '(', optional($.list_of_param_assignments), ')'),

    list_of_param_assignments: ($) =>
      choice(
        seq(
          $.ordered_parameter_assignment,
          repeat(seq(',', $.ordered_parameter_assignment))
        ),
        seq(
          $.named_parameter_assignment,
          repeat(seq(',', $.named_parameter_assignment))
        )
      ),

    ordered_parameter_assignment: ($) => $.param_expression,

    named_parameter_assignment: ($) =>
      seq('.', $.parameter_identifier, '(', optional($.param_expression), ')'),

    hierarchical_instance: ($) =>
      seq($.name_of_instance, '(', optional($.list_of_port_connections), ')'),

    name_of_instance: ($) =>
      seq($.instance_identifier, repeat($.unpacked_dimension)),

    list_of_port_connections: ($) =>
      choice(
        seq(
          $.ordered_port_connection,
          repeat(seq(',', $.ordered_port_connection))
        ),
        seq($.named_port_connection, repeat(seq(',', $.named_port_connection)))
      ),

    ordered_port_connection: ($) =>
      seq(repeat($.attribute_instance), optional($.expression)),

    named_port_connection: ($) =>
      choice(
        seq(
          repeat($.attribute_instance),
          '.',
          $.port_identifier,
          optional(seq('(', optional($.expression), ')'))
        ),
        seq(repeat($.attribute_instance), '.*')
      ),

    // A.4.1.2 Interface instantiation

    // A.4.1.3 Program instantiation

    // A.4.2 Generated instantiation
    generate_region: ($) =>
      seq('generate', repeat($.generate_item), 'endgenerate'),

    loop_generate_construct: ($) =>
      seq(
        'for',
        '(',
        $.genvar_initialization,
        ';',
        $.genvar_expression,
        ';',
        $.genvar_iteration,
        ')',
        $.generate_block
      ),

    genvar_initialization: ($) =>
      seq(optional('genvar'), $.genvar_identifier, '=', $.constant_expression),

    genvar_iteration: ($) =>
      choice(
        seq($.genvar_identifier, $.assignment_operator, $.genvar_expression),
        seq($.inc_or_dec_operator, $.genvar_identifier),
        seq($.genvar_identifier, $.inc_or_dec_operator)
      ),

    conditional_generate_construct: ($) =>
      choice($.if_generate_construct, $.case_generate_construct),

    if_generate_construct: ($) =>
      seq(
        'if',
        '(',
        $.constant_expression,
        ')',
        $.generate_block,
        optional(seq('else', $.generate_block))
      ),

    case_generate_construct: ($) =>
      seq(
        'case',
        '(',
        $.constant_expression,
        ')',
        $.case_generate_item,
        repeat($.case_generate_item),
        'endcase'
      ),

    case_generate_item: ($) =>
      choice(
        seq(
          $.constant_expression,
          repeat(seq(',', $.constant_expression)),
          ':',
          $.generate_block
        ),
        seq('default', optional(':'), $.generate_block)
      ),

    generate_block: ($) =>
      seq(
        choice(
          $.generate_item,
          seq(
            optional(seq($.generate_block_identifier, ':')),
            'begin',
            optional(seq(':', $.generate_block_identifier)),
            repeat($.generate_item)
          )
        ),
        seq('end', optional(seq(':', $.generate_block_identifier)))
      ),

    generate_item: ($) =>
      choice(
        $.module_or_generate_item,
        $.interface_or_generate_item
        // $.checker_or_generate_item
      ),

    // A.6.2 Procedural blocks and assignments
    assignment_operator: () =>
      choice(
        '=',
        '+=',
        '-=',
        '*=',
        '/=',
        '%=',
        '&=',
        '|=',
        '^=',
        '<<=',
        '>>=',
        '<<<=',
        '>>>='
      ),

    // A.6.4 Statements
    statement_or_null: ($) =>
      choice($.statement, seq(repeat($.attribute_instance), ';')),

    statement: ($) =>
      seq(
        optional(seq($.block_identifier, ':')),
        repeat($.attribute_instance),
        $.statement_item
      ),

    statement_item: ($) =>
      choice(
        // seq($.blocking_assignment, ';'),
        // seq($.nonblocking_assignment, ';'),
        // seq($.procedural_continuous_assignment, ';'),
        // $.case_statement,
        // $.conditional_statement,
        // seq($.inc_or_dec_expression, ';'),
        $.subroutine_call_statement,
        $.disable_statement,
        // $.event_trigger,
        // $.loop_statement,
        // $.jump_statement,
        // $.par_block,
        // $.procedural_timing_control_statement,
        // $.seq_block,
        // $.wait_statement,
        // $.procedural_assertion_statement,
        // seq($.clocking_drive, ';'),
        // $.randsequence_statement,
        $.randcase_statement
        // $.expect_property_statement
      ),

    function_statement: ($) => $.statement,

    function_statement_or_null: ($) =>
      choice($.function_statement, seq(repeat($.attribute_instance), ';')),

    variable_identifier_list: ($) =>
      seq($.variable_identifier, repeat(seq(',', $.variable_identifier))),

    // A.6.5 Timing control statements
    disable_statement: ($) =>
      choice(
        seq('disable', $.hierarchical_task_identifier, ';'),
        seq('disable', $.hierarchical_block_identifier, ';'),
        seq('disable', 'fork', ';')
      ),

    // A.6.7 Case statements
    randcase_statement: ($) =>
      seq('randcase', repeat1($.randcase_item), 'endcase'),

    randcase_item: ($) => seq($.expression, ':', $.statement_or_null),

    // A.6.9 Subroutine call statements
    subroutine_call_statement: ($) =>
      choice(
        seq($.subroutine_call, ';'),
        seq('void', "'", '(', $.function_subroutine_call, ')', ';')
      ),

    // A.8.2 Subroutine calls
    constant_function_call: ($) => $.function_subroutine_call,

    tf_call: ($) =>
      seq(
        $.ps_or_hierarchical_tf_identifier,
        repeat($.attribute_instance),
        optional(seq('(', $.list_of_arguments, ')'))
      ),

    system_tf_call: ($) =>
      choice(
        seq(
          $.system_tf_identifier,
          optional(seq('(', $.list_of_arguments, ')'))
        ),
        seq(
          $.system_tf_identifier,
          '(',
          $.data_type,
          optional(seq(',', $.expression)),
          ')'
        )
        // seq(
        //   $.system_tf_identifier,
        //   '(',
        //   $.expression,
        //   repeat(seq(',', optional($.expression))),
        //   optional(seq(',', optional($.clocking_event))),
        //   ')'
        // )
      ),

    subroutine_call: ($) =>
      choice(
        $.tf_call,
        $.system_tf_call,
        // $.method_call,
        seq(optional(seq('std', '::')), $.randomize_call)
      ),

    function_subroutine_call: ($) => $.subroutine_call,

    list_of_arguments: ($) =>
      choice(
        seq(
          optional($.expression),
          repeat(seq(',', optional($.expression))),
          repeat(seq(',', '.', $.identifier, '(', optional($.expression), ')'))
        ),
        seq(
          '.',
          $.identifier,
          '(',
          optional($.expression),
          ')',
          repeat(seq(',', '.', $.identifier, '(', optional($.expression), ')'))
        )
      ),

    // array_manipulation_call: ($) => seq(
    //   $.array_method_name,
    //   repeat($.attribute_instance),
    //   optional(seq('(', $.list_of_arguments, ')')),
    //   optional(seq('with', '(', $.expression, ')')),
    // ),

    randomize_call: ($) =>
      seq(
        'randomize',
        repeat($.attribute_instance),
        optional(
          seq('(', optional(choice($.variable_identifier_list, 'null')), ')')
        )
        // optional(
        //   seq(
        //     'with',
        //     optional(seq('(', optional($.identifier_list), ')')),
        //     $.constraint_block
        //   )
        // )
      ),

    // A.8.3 Expressions
    constant_expression: ($) =>
      choice(
        // $.constant_primary,
        // seq($.unary_operator, repeat($.attribute_instance), $.constant_primary),
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

    constant_mintypmax_expression: ($) =>
      choice(
        $.constant_expression,
        seq(
          $.constant_expression,
          ':',
          $.constant_expression,
          ':',
          $.constant_expression
        )
      ),

    constant_param_expression: ($) =>
      choice($.constant_mintypmax_expression, $.data_type, '$'),

    param_expression: ($) => choice($.mintypmax_expression, $.data_type, '$'),

    constant_range_expression: ($) =>
      choice($.constant_expression, $.constant_part_select_range),

    constant_part_select_range: ($) =>
      choice($.constant_range, $.constant_indexed_range),

    constant_range: ($) =>
      seq($.constant_expression, ':', $.constant_expression),

    constant_indexed_range: ($) =>
      choice(
        seq($.constant_expression, '+:', $.constant_expression),
        seq($.constant_expression, '-:', $.constant_expression)
      ),

    expression: ($) =>
      choice(
        // $.primary,
        $.unary_operator,
        repeat($.attribute_instance),
        // $.primary,
        // $.inc_or_dec_expression,
        // seq('(', $.operator_assignment, ')'),
        seq(
          $.expression,
          $.binary_operator,
          repeat($.attribute_instance),
          $.expression
        )
        // $.conditional_expression,
        // $.inside_expression,
        // $.tagged_union_expression
      ),

    mintypmax_expression: ($) =>
      choice(
        $.expression,
        seq($.expression, ':', $.expression, ':', $.expression)
      ),

    genvar_expression: ($) => $.constant_expression,

    // A.8.4 Primaries
    time_literal: ($) =>
      choice(
        seq($.unsigned_number, $.time_unit),
        seq($.fixed_point_number, $.time_unit)
      ),

    time_unit: () => choice('s', 'ms', 'us', 'ns', 'ps', 'fs'),

    constant_bit_select: ($) => repeat(seq('[', $.constant_expression, ']')),

    constant_select: ($) =>
      seq(
        optional(
          seq(
            repeat(seq('.', $.member_identifier, $.constant_bit_select)),
            '.',
            $.member_identifier
          )
        ),
        $.constant_bit_select,
        optional(seq('[', $.constant_part_select_range, ']'))
      ),

    // A.8.6 Operators
    unary_operator: () =>
      choice('+', '-', '!', '~', '&', '~&', '|', '~|', '^', '~^', '^~'),

    binary_operator: () =>
      choice(
        '+',
        '-',
        '*',
        '/',
        '%',
        '==',
        '!=',
        '===',
        '!==',
        '==?',
        '!=?',
        '&&',
        '||',
        '**',
        '<',
        '<=',
        '>',
        '>=',
        '&',
        '|',
        '^',
        '^~',
        '~^',
        '>>',
        '<<',
        '>>>',
        '<<<',
        '->',
        '<->'
      ),

    inc_or_dec_operator: () => choice('++', '--'),

    // A.8.7 Numbers
    fixed_point_number: ($) => seq($.unsigned_number, '.', $.unsigned_number),

    unsigned_number: ($) =>
      seq($.decimal_digit, repeat(choice('_', $.decimal_digit))),

    decimal_digit: () => /[0-9]/,

    // A.9 General

    // A.9.1 Attributes
    attribute_instance: ($) =>
      seq('(*', $.attr_spec, repeat(seq(',', $.attr_spec)), '*)'),

    attr_spec: ($) =>
      seq($.attr_name, optional(seq('=', $.constant_expression))),

    attr_name: ($) => $.identifier,

    // A.9.2 Comments
    comment: ($) => choice($.one_line_comment, $.block_comment),
    one_line_comment: ($) => seq('//', $.comment_text, '\n'),
    block_comment: ($) => seq('/*', $.comment_text, '*/'),
    comment_text: () => /[\x00-\x7F]/,

    // A.9.3 Identifiers
    array_identifier: ($) => $.identifier,
    block_identifier: ($) => $.identifier,
    bin_identifier: ($) => $.identifier,
    c_identifier: ($) => seq(/[ a-zA-Z_ ]/, repeat(/[ a-zA-Z0-9_ ]/)),
    cell_identifier: ($) => $.identifier,
    checker_identifier: ($) => $.identifier,
    class_identifier: ($) => $.identifier,
    class_variable_identifier: ($) => $.variable_identifier,
    clocking_identifier: ($) => $.identifier,
    config_identifier: ($) => $.identifier,
    const_identifier: ($) => $.identifier,
    constraint_identifier: ($) => $.identifier,
    covergroup_identifier: ($) => $.identifier,
    covergroup_variable_identifier: ($) => $.variable_identifier,
    cover_point_identifier: ($) => $.identifier,
    cross_identifier: ($) => $.identifier,
    dynamic_array_variable_identifier: ($) => $.variable_identifier,
    enum_identifier: ($) => $.identifier,
    escaped_identifier: ($) => seq('\\', /[^\s]/, /\s/),
    formal_identifier: ($) => $.identifier,
    formal_port_identifier: ($) => $.identifier,
    function_identifier: ($) => $.identifier,
    generate_block_identifier: ($) => $.identifier,
    genvar_identifier: ($) => $.identifier,
    hierarchical_array_identifier: ($) => $.hierarchical_identifier,
    hierarchical_block_identifier: ($) => $.hierarchical_identifier,
    hierarchical_event_identifier: ($) => $.hierarchical_identifier,
    hierarchical_identifier: ($) =>
      seq(
        optional(seq('$root', '.')),
        repeat(seq($.identifier, $.constant_bit_select, '.')),
        $.identifier
      ),
    hierarchical_net_identifier: ($) => $.hierarchical_identifier,
    hierarchical_parameter_identifier: ($) => $.hierarchical_identifier,
    hierarchical_property_identifier: ($) => $.hierarchical_identifier,
    hierarchical_sequence_identifier: ($) => $.hierarchical_identifier,
    hierarchical_task_identifier: ($) => $.hierarchical_identifier,
    hierarchical_tf_identifier: ($) => $.hierarchical_identifier,
    hierarchical_variable_identifier: ($) => $.hierarchical_identifier,
    identifier: ($) => choice($.simple_identifier, $.escaped_identifier),
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
    net_identifier: ($) => $.identifier,
    net_type_identifier: ($) => $.identifier,
    output_port_identifier: ($) => $.identifier,
    package_identifier: ($) => $.identifier,
    package_scope: ($) =>
      choice(seq($.package_identifier, '::'), seq('$unit', '::')),
    parameter_identifier: ($) => $.identifier,
    port_identifier: ($) => $.identifier,
    production_identifier: ($) => $.identifier,
    program_identifier: ($) => $.identifier,
    property_identifier: ($) => $.identifier,
    ps_or_hierarchical_tf_identifier: ($) =>
      choice(
        seq(optional($.package_scope), $.tf_identifier),
        $.hierarchical_identifier
      ),
    sequence_identifier: ($) => $.identifier,
    signal_identifier: ($) => $.identifier,
    simple_identifier: () => seq(/[a-zA-Z_]/, repeat(/[a-zA-Z0-9_$]/)),
    specparam_identifier: ($) => $.identifier,
    system_tf_identifier: () => seq('$', repeat1(/[a-zA-Z0-9_$]/)),
    task_identifier: ($) => $.identifier,
    tf_identifier: ($) => $.identifier,
    terminal_identifier: ($) => $.identifier,
    topmodule_identifier: ($) => $.identifier,
    type_identifier: ($) => $.identifier,
    udp_identifier: ($) => $.identifier,
    variable_identifier: ($) => $.identifier,
  },
})
