// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var $$Set                      = require("bs-platform/lib/js/set.js");
var List                       = require("bs-platform/lib/js/list.js");
var Block                      = require("bs-platform/lib/js/block.js");
var Curry                      = require("bs-platform/lib/js/curry.js");
var Caml_obj                   = require("bs-platform/lib/js/caml_obj.js");
var Caml_string                = require("bs-platform/lib/js/caml_string.js");
var Tree$LonaCompilerCore      = require("../containers/tree.bs.js");
var Caml_builtin_exceptions    = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var Render$LonaCompilerCore    = require("./render.bs.js");
var LonaValue$LonaCompilerCore = require("./lonaValue.bs.js");

function compare(a, b) {
  return Caml_string.caml_string_compare(Render$LonaCompilerCore.$$String[/* join */0]("", a[1]), Render$LonaCompilerCore.$$String[/* join */0]("", b[1]));
}

var include = $$Set.Make(/* module */[/* compare */compare]);

var empty = include[0];

var add = include[3];

var exists = include[15];

var elements = include[19];

var IdentifierSet_001 = /* is_empty */include[1];

var IdentifierSet_002 = /* mem */include[2];

var IdentifierSet_004 = /* singleton */include[4];

var IdentifierSet_005 = /* remove */include[5];

var IdentifierSet_006 = /* union */include[6];

var IdentifierSet_007 = /* inter */include[7];

var IdentifierSet_008 = /* diff */include[8];

var IdentifierSet_009 = /* compare */include[9];

var IdentifierSet_010 = /* equal */include[10];

var IdentifierSet_011 = /* subset */include[11];

var IdentifierSet_012 = /* iter */include[12];

var IdentifierSet_013 = /* fold */include[13];

var IdentifierSet_014 = /* for_all */include[14];

var IdentifierSet_016 = /* filter */include[16];

var IdentifierSet_017 = /* partition */include[17];

var IdentifierSet_018 = /* cardinal */include[18];

var IdentifierSet_020 = /* min_elt */include[20];

var IdentifierSet_021 = /* max_elt */include[21];

var IdentifierSet_022 = /* choose */include[22];

var IdentifierSet_023 = /* split */include[23];

var IdentifierSet_024 = /* find */include[24];

var IdentifierSet_025 = /* of_list */include[25];

var IdentifierSet = /* module */[
  /* empty */empty,
  IdentifierSet_001,
  IdentifierSet_002,
  /* add */add,
  IdentifierSet_004,
  IdentifierSet_005,
  IdentifierSet_006,
  IdentifierSet_007,
  IdentifierSet_008,
  IdentifierSet_009,
  IdentifierSet_010,
  IdentifierSet_011,
  IdentifierSet_012,
  IdentifierSet_013,
  IdentifierSet_014,
  /* exists */exists,
  IdentifierSet_016,
  IdentifierSet_017,
  IdentifierSet_018,
  /* elements */elements,
  IdentifierSet_020,
  IdentifierSet_021,
  IdentifierSet_022,
  IdentifierSet_023,
  IdentifierSet_024,
  IdentifierSet_025
];

function children(node) {
  if (typeof node === "number") {
    return /* [] */0;
  } else {
    switch (node.tag | 0) {
      case 0 : 
          return /* :: */[
                  node[3],
                  /* [] */0
                ];
      case 1 : 
          return /* :: */[
                  node[1],
                  /* [] */0
                ];
      case 6 : 
          return node[0];
      default:
        return /* [] */0;
    }
  }
}

function restore(node, contents) {
  if (typeof node === "number") {
    return node;
  } else {
    switch (node.tag | 0) {
      case 0 : 
          return /* If */Block.__(0, [
                    node[0],
                    node[1],
                    node[2],
                    List.nth(contents, 0)
                  ]);
      case 1 : 
          return /* IfExists */Block.__(1, [
                    node[0],
                    List.nth(contents, 0)
                  ]);
      case 6 : 
          return /* Block */Block.__(6, [contents]);
      default:
        return node;
    }
  }
}

var LogicTree = Tree$LonaCompilerCore.Make(/* module */[
      /* children */children,
      /* restore */restore
    ]);

function getValueType(value) {
  if (value.tag) {
    return value[0][/* ltype */0];
  } else {
    return value[0];
  }
}

function accessedIdentifiers(node) {
  var inner = function (node, identifiers) {
    if (typeof node === "number") {
      return identifiers;
    } else if (node.tag === 2) {
      var match = node[1];
      if (match.tag) {
        return identifiers;
      } else {
        return Curry._2(add, /* tuple */[
                    match[0],
                    match[1]
                  ], identifiers);
      }
    } else {
      return identifiers;
    }
  };
  return Curry._3(LogicTree[/* reduce */0], inner, empty, node);
}

function isLayerParameterAssigned(logicNode, parameterName, layer) {
  var isAssigned = function (param) {
    return Caml_obj.caml_equal(param[1], /* :: */[
                "layers",
                /* :: */[
                  layer[/* name */1],
                  /* :: */[
                    parameterName,
                    /* [] */0
                  ]
                ]
              ]);
  };
  return Curry._2(exists, isAssigned, accessedIdentifiers(logicNode));
}

function conditionallyAssignedIdentifiers(rootNode) {
  var identifiers = accessedIdentifiers(rootNode);
  var paths = Curry._1(elements, identifiers);
  var isAlwaysAssigned = function (target, _node) {
    while(true) {
      var node = _node;
      if (typeof node === "number") {
        return /* false */0;
      } else {
        switch (node.tag | 0) {
          case 0 : 
              var match = node[2];
              if (match.tag) {
                return /* false */0;
              } else if (Caml_obj.caml_equal(match[1], target)) {
                _node = node[3];
                continue ;
                
              } else {
                return /* false */0;
              }
              break;
          case 2 : 
              var match$1 = node[1];
              if (match$1.tag) {
                return /* false */0;
              } else {
                return Caml_obj.caml_equal(match$1[1], target);
              }
              break;
          case 6 : 
              return List.exists((function (param) {
                            return isAlwaysAssigned(target, param);
                          }), node[0]);
          default:
            return /* false */0;
        }
      }
    };
  };
  var accumulate = function (set, param) {
    var path = param[1];
    var match = isAlwaysAssigned(path, rootNode);
    if (match !== 0) {
      return set;
    } else {
      return Curry._2(add, /* tuple */[
                  param[0],
                  path
                ], set);
    }
  };
  return List.fold_left(accumulate, empty, paths);
}

function addVariableDeclarations(node) {
  var identifiers = accessedIdentifiers(node);
  return List.fold_left((function (acc, declaration) {
                return Curry._2(LogicTree[/* insert_child */8], (function (item) {
                              var match = Caml_obj.caml_equal(item, acc);
                              if (match !== 0) {
                                return /* Some */[declaration];
                              } else {
                                return /* None */0;
                              }
                            }), acc);
              }), node, List.map((function (param) {
                    return /* Let */Block.__(4, [/* Identifier */Block.__(0, [
                                  param[0],
                                  param[1]
                                ])]);
                  }), Curry._1(elements, identifiers)));
}

function prepend(newNode, node) {
  return /* Block */Block.__(6, [/* :: */[
              newNode,
              /* :: */[
                node,
                /* [] */0
              ]
            ]]);
}

function append(newNode, node) {
  return /* Block */Block.__(6, [/* :: */[
              node,
              /* :: */[
                newNode,
                /* [] */0
              ]
            ]]);
}

function setIdentiferName(name, value) {
  if (value.tag) {
    return value;
  } else {
    return /* Identifier */Block.__(0, [
              value[0],
              name
            ]);
  }
}

function replaceIdentifierName(oldName, newName, value) {
  if (!value.tag && Caml_obj.caml_equal(value[1], oldName)) {
    return /* Identifier */Block.__(0, [
              value[0],
              newName
            ]);
  } else {
    return value;
  }
}

function replaceIdentifiersNamed(oldName, newName, node) {
  var replaceChild = function (param) {
    return replaceIdentifiersNamed(oldName, newName, param);
  };
  if (typeof node === "number") {
    return node;
  } else {
    switch (node.tag | 0) {
      case 0 : 
          return /* If */Block.__(0, [
                    replaceIdentifierName(oldName, newName, node[0]),
                    node[1],
                    replaceIdentifierName(oldName, newName, node[2]),
                    replaceIdentifiersNamed(oldName, newName, node[3])
                  ]);
      case 1 : 
          return /* IfExists */Block.__(1, [
                    replaceIdentifierName(oldName, newName, node[0]),
                    replaceIdentifiersNamed(oldName, newName, node[1])
                  ]);
      case 2 : 
          return /* Assign */Block.__(2, [
                    replaceIdentifierName(oldName, newName, node[0]),
                    replaceIdentifierName(oldName, newName, node[1])
                  ]);
      case 3 : 
          return /* Add */Block.__(3, [
                    replaceIdentifierName(oldName, newName, node[0]),
                    replaceIdentifierName(oldName, newName, node[1]),
                    replaceIdentifierName(oldName, newName, node[2])
                  ]);
      case 4 : 
          return /* Let */Block.__(4, [replaceIdentifierName(oldName, newName, node[0])]);
      case 5 : 
          return /* LetEqual */Block.__(5, [
                    replaceIdentifierName(oldName, newName, node[0]),
                    replaceIdentifierName(oldName, newName, node[1])
                  ]);
      case 6 : 
          return /* Block */Block.__(6, [List.map(replaceChild, node[0])]);
      
    }
  }
}

function addIntermediateVariable(identifier, newName, defaultValue, node) {
  var ltype = getValueType(identifier);
  var oldName;
  if (identifier.tag) {
    throw Caml_builtin_exceptions.not_found;
  } else {
    oldName = identifier[1];
  }
  var newVariable = /* Identifier */Block.__(0, [
      ltype,
      newName
    ]);
  return /* Block */Block.__(6, [/* :: */[
              /* LetEqual */Block.__(5, [
                  newVariable,
                  defaultValue
                ]),
              /* :: */[
                replaceIdentifiersNamed(oldName, newName, node),
                /* :: */[
                  /* Assign */Block.__(2, [
                      newVariable,
                      identifier
                    ]),
                  /* [] */0
                ]
              ]
            ]]);
}

function defaultValueForType(lonaType) {
  switch (lonaType.tag | 0) {
    case 0 : 
        switch (lonaType[0]) {
          case "Boolean" : 
              return LonaValue$LonaCompilerCore.$$boolean(/* false */0);
          case "Number" : 
              return LonaValue$LonaCompilerCore.number(0);
          case "String" : 
              return LonaValue$LonaCompilerCore.string("");
          default:
            console.log("No default value for lonaType");
            throw Caml_builtin_exceptions.not_found;
        }
        break;
    case 1 : 
    case 2 : 
        console.log("No default value for lonaType");
        throw Caml_builtin_exceptions.not_found;
    
  }
}

function defaultValueForLayerParameter(_, textStyles, _$1, parameterName) {
  switch (parameterName) {
    case "backgroundColor" : 
        return LonaValue$LonaCompilerCore.color("transparent");
    case "font" : 
    case "textStyle" : 
        return LonaValue$LonaCompilerCore.textStyle(textStyles[/* defaultStyle */1][/* id */0]);
    default:
      return LonaValue$LonaCompilerCore.defaultValueForParameter(parameterName);
  }
}

function assignmentForLayerParameter(layer, parameterName, value) {
  var receiver_000 = value[/* ltype */0];
  var receiver_001 = /* :: */[
    "layers",
    /* :: */[
      layer[/* name */1],
      /* :: */[
        parameterName,
        /* [] */0
      ]
    ]
  ];
  var receiver = /* Identifier */Block.__(0, [
      receiver_000,
      receiver_001
    ]);
  var source = /* Literal */Block.__(1, [value]);
  return /* Assign */Block.__(2, [
            source,
            receiver
          ]);
}

function defaultAssignmentForLayerParameter(colors, textStyles, layer, parameterName) {
  var value = defaultValueForLayerParameter(colors, textStyles, layer, parameterName);
  return assignmentForLayerParameter(layer, parameterName, value);
}

function enforceSingleAssignment(getIntermediateName, getDefaultValue, node) {
  var identifiers = conditionallyAssignedIdentifiers(node);
  var addVariable = function (node, param) {
    var name = param[1];
    var lonaType = param[0];
    var newName = Curry._2(getIntermediateName, lonaType, name);
    var defaultValue = Curry._2(getDefaultValue, lonaType, name);
    return addIntermediateVariable(/* Identifier */Block.__(0, [
                  lonaType,
                  name
                ]), newName, defaultValue, node);
  };
  return List.fold_left(addVariable, node, Curry._1(elements, identifiers));
}

exports.IdentifierSet                      = IdentifierSet;
exports.LogicTree                          = LogicTree;
exports.getValueType                       = getValueType;
exports.accessedIdentifiers                = accessedIdentifiers;
exports.isLayerParameterAssigned           = isLayerParameterAssigned;
exports.conditionallyAssignedIdentifiers   = conditionallyAssignedIdentifiers;
exports.addVariableDeclarations            = addVariableDeclarations;
exports.prepend                            = prepend;
exports.append                             = append;
exports.setIdentiferName                   = setIdentiferName;
exports.replaceIdentifierName              = replaceIdentifierName;
exports.replaceIdentifiersNamed            = replaceIdentifiersNamed;
exports.addIntermediateVariable            = addIntermediateVariable;
exports.defaultValueForType                = defaultValueForType;
exports.defaultValueForLayerParameter      = defaultValueForLayerParameter;
exports.assignmentForLayerParameter        = assignmentForLayerParameter;
exports.defaultAssignmentForLayerParameter = defaultAssignmentForLayerParameter;
exports.enforceSingleAssignment            = enforceSingleAssignment;
/* include Not a pure module */
