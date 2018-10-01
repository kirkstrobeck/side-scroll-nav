port module Main exposing (main)

-- import Dom exposing (..)

import Css exposing (..)
import Css.Global exposing (descendants, typeSelector, withClass)
import Debug exposing (log)
import Dom.Scroll exposing (toTop)
import Html exposing (programWithFlags)
import Html.Styled exposing (Html, a, div, li, text, toUnstyled, ul)
import Html.Styled.Attributes exposing (attribute, class, css, href, id, src)
import Html.Styled.Events exposing (onClick)
import Maybe exposing (withDefault)


main : Program InputModel Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = subscriptions
        }


type alias Nav =
    { title : String
    , id : String
    }


type alias InputModel =
    { active : String
    , contents : List Nav
    , containerClassName : Maybe String
    , wrapperId : String
    }


type alias Model =
    { active : String
    , contents : List Nav
    , containerClassName : String
    , wrapperId : String
    }


modelWithDefaults : InputModel -> Model
modelWithDefaults input =
    { input | containerClassName = withDefault "" input.containerClassName }


init : InputModel -> ( Model, Cmd Msg )
init reactProps =
    ( modelWithDefaults reactProps, Cmd.none )


type alias ElmToReactMsg =
    { command : String
    , payload : String
    }


type Msg
    = ReactUpdate Model
    | ElmToReactSender ElmToReactMsg


theme =
    { blue = hex "0000ff"
    , blueDark = hex "00008B"
    , grey = hex "f5f5f5"
    , greyDark = hex "dfdfdf"
    , red = hex "ff0000"
    , white = hex "ffffff"
    }


update msg model =
    case msg of
        ReactUpdate model ->
            ( model, Cmd.none )

        ElmToReactSender obj ->
            ( model, elmToReact obj )


port reactToElm : (Model -> action) -> Sub action


port elmToReact : ElmToReactMsg -> Cmd a


subscriptions : Model -> Sub Msg
subscriptions model =
    reactToElm ReactUpdate


view : Model -> Html Msg
view { active, contents, containerClassName, wrapperId } =
    div
        [ css
            [ height (px 60)
            , position fixed
            , top (px 0)
            , width (pct 100)
            , before
                [ property "content" "''"
                , height (px 50)
                , backgroundColor theme.grey
                , borderBottom3 (px 1) solid theme.greyDark
                , display block
                , width (pct 100)
                , position absolute
                , top (px 0)
                , zIndex (int -1)
                ]
            ]
        , id wrapperId
        ]
        [ div
            [ class containerClassName
            , attribute "data-anchor" ""
            ]
            [ div [] [] ]
        , div
            [ class containerClassName
            , attribute "data-scroller" ""
            , css
                [ overflowX scroll
                , height (px 60)
                , property
                    "-webkit-overflow-scrolling"
                    "touch"
                ]
            ]
            [ ul
                [ css
                    [ margin4 (px 5) (px 0) (px 0) (px 0)
                    , padding (px 0)
                    , listStyleType none
                    , display inlineBlock
                    , lineHeight (px 40)
                    , height (px 40)
                    , whiteSpace noWrap
                    , verticalAlign middle
                    , descendants
                        [ typeSelector ".active a"
                            [ textDecoration none
                            , before
                                [ property "content" "''"
                                , height (px 3)
                                , width (pct 100)
                                , display block
                                , bottom (px 5)
                                , position absolute
                                , backgroundColor theme.blue
                                ]
                            , hover
                                [ before [ backgroundColor theme.blueDark ]
                                ]
                            ]
                        ]
                    ]
                ]
                (List.map
                    (\item ->
                        li
                            [ css
                                [ margin4 (px 0) (px 0) (px 0) (px 25)
                                , display inlineBlock
                                , firstChild
                                    [ marginLeft (px 0) ]
                                ]
                            , attribute "data-id" item.id
                            , class
                                (if active == item.id then
                                    "active"

                                 else
                                    ""
                                )
                            ]
                            [ a
                                [ css
                                    [ cursor pointer
                                    , property "user-select" "none"
                                    , whiteSpace noWrap
                                    , height (px 40)
                                    , overflow hidden
                                    , display block
                                    , textOverflow ellipsis
                                    , maxWidth (px 150)
                                    , position relative
                                    , color theme.blue
                                    , hover
                                        [ textDecoration none
                                        , color theme.blueDark
                                        ]
                                    ]
                                , onClick
                                    (ElmToReactSender
                                        (ElmToReactMsg "scrollTo" item.id)
                                    )
                                ]
                                [ text item.title ]
                            ]
                    )
                    contents
                )
            ]
        ]
