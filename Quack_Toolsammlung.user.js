// ==UserScript==
// @name           Quack Toolsammlung
// @namespace      Quack
// @description    Extends Grepolis and includes many useful tools into the game
// @include        http://*.grepolis.*/game*
// @icon           http://s1.directupload.net/images/140711/eshmcqzu.png
// @version        2.40.04
// @grant          GM_listValues
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_info
// @grant          GM_xmlhttpRequest
// ==/UserScript==

/************************************************************************
 * Main Script
 ***********************************************************************/
function main_script(DATA) {
	/************************************************************************
	 * Global variables
	 ***********************************************************************/
	var QT = {};
	var wID = Game.world_id;
	var mID = Game.market_id;
	var aID = Game.alliance_id;
	var sID = Game.player_id;
	var pName = Game.player_name;

	/************************************************************************
	 * Languages
	 ***********************************************************************/
	QT.Lang = {
		get : function (a, b) {
			if (QT.Lang[mID] != undefined && QT.Lang[mID][a] != undefined && QT.Lang[mID][a][b] != undefined) {
				return QT.Lang[mID][a][b]
			} else {
				return QT.Lang.en[a][b]
			}
		},
		br : {
			meta : {
				flag : 'http://s7.directupload.net/images/140507/u6xmafci.png'
			},
			reports : {
				choose_folder : 'Escolher pasta',
				enacted : 'promulgada',
				conquered : 'conquistado',
				spying : 'espionagem',
				spy : 'Espião',
				support : 'apoio',
				supporting : 'que apoia',
				attacking : 'atacante',
				farming_village : 'Aldeias barbaras'
			},
			forum : {
				delete : 'Excluir',
				delete_sure : 'Você realmente deseja excluir essas mensagens?',
				no_selection : 'Não existem mensagens selecionadas'
			},
			town_info : {
				no_overload : 'Sem sobrecarga',
				delete : 'Excluir',
				polissuche : 'Pesquisa cidade',
				inactivity : 'Inatividade',
				days : 'dias',
				no_data : 'O jogador ainda não está listado no banco de dados'
			},
			grepo_mainmenu : {
				city_view : 'Vista da cidade',
				island_view : 'Vista Ilha'
			},
			messages : {
				ghosttown : 'Cidade fantasma',
				no_cities : 'Nenhuma cidade nesta ilha',
				all : 'Tudo',
				export : 'Converta mensagem em BB-Code'
			},
			hotkeys : {
				hotkeys : 'Teclas de atalho',
				city_select : 'Seleção Cidade',
				last_city : 'Última cidade',
				next_city : 'Próxima cidade',
				jump_city : 'Ir para a cidade atual',
				administrator : 'Administrador',
				captain : 'Capitão',
				trade_ov : 'Comércio',
				command_ov : 'Comandos',
				recruitment_ov : 'Recrutamento',
				troop_ov : 'Visão geral Tropa',
				troops_outside : 'Tropas fora',
				building_ov : 'Edifício',
				culture_ov : 'Cultura',
				gods_ov : 'Deuses',
				cave_ov : 'Gruta',
				city_groups_ov : 'Grupos da cidade',
				city_list : 'Lista da Cidade',
				attack_planner : 'Planejador de ataque',
				farming_villages : 'Aldeias barbaras',
				menu : 'Menu.',
				city_view : 'Vista da cidade',
				messages : 'Mensagens',
				reports : 'Relatórios',
				alliance : 'Aliança',
				alliance_forum : 'Fórum da aliança',
				settings : 'Configurações',
				profile : 'Perfil',
				ranking : 'Posição',
				notes : 'Notas',
				chat : 'Chat',
				council : 'Conselho de heróis'
			},
			qtoolbox : {
				onlinecounter_now : 'Tempo',
				onlinecounter_total : 'Total',
				onlinecounter_switch : 'Atual Online',
				stats : 'Estatística',
				grepostats : 'Estatísticas Grepo',
				player : 'Jogador',
				alliance : 'Aliança',
				rankings : 'Classificação',
				grepo_bash : 'Grepo atacante',
				track_player : 'Rastrear um Jogador',
				track_alliance : 'Acompanhe uma Aliança',
				top_killers : 'Top atacante',
				maps : 'Maaps',
				grepo_maps : 'Grepo Mapas',
				grepo_intel : 'Grepo Intel.',
				townsearches : 'Pesquisas Cidade',
				grepo_finder : 'Grepo Localizador',
				tonda_polissuche : 'Procurar Cidade',
				bb_codes : 'BB-Codes',
				in_town : 'Na cidade',
				from_town : 'Da cidade',
				outside_town : 'Fora da cidade',
				tools : 'Ferramentas',
				unit_comparison : 'Comparação Unit',
				google_docs : 'Google Docs',
				deff_helper : 'Deff Helper',
				display_modes : 'Exibir',
				full_screen : 'Tela cheia',
				minimal : 'Mínimo',
				standard : 'Padrão',
				stats_scripts : 'Est. / Scripts',
				settings : 'Opções'
			},
			academy : {
				researched : 'Colorize pesquisado',
				notresearched : 'Colorize não pesquisou',
				undo : 'Desfazer coloração'
			},
			caves : {
				stored_silver : 'Moedas de prata armazenados',
				name : 'Nome',
				wood : 'Madeira',
				stone : 'Pedra',
				silver : 'Moedas de prata'
			},
			transport_calc : {
				btn_main : 'Calc. Transporte',
				available : 'Disponível capacidade de transporte',
				transportable : 'Unidades transportáveis',
				recruits : 'Unidades na fila de recrutamento Contagem',
				outsidetown : 'Contagem unidades fora da cidade',
				slowtrans : 'Contagem navios de transporte lentos',
				fasttrans : 'Contagem navios de transporte rápido'
			},
			culture : {
				cityfestivals : 'Festivais da cidade',
				olympicgames : 'Jogos Olímpicos',
				triumph : 'Procissões de Vitória',
				theater : 'Peças de teatro'
			},
			settings : {
				text2 : 'Balcão online',
				text3 : 'Abrir links do menu de ingame',
				text4 : 'Ative a inclusão de outros scripts Greasemonkey para o menu',
				text5 : 'Mostrar botões para exposição permanente da fila de unidade, os movimentos eo comércio',
				text6 : 'Barra de botões',
				text9 : 'Exibição no início',
				text11 : 'Desativar economia de tempo online total',
				text12 : 'Calculadora de Transporte',
				text13 : 'Tela do Menu',
				text14 : 'Funções do menu',
				text15 : 'Relatórios',
				text16 : 'Adicione cor',
				text17 : 'Adicionar filtro',
				text18 : 'Ative exibição',
				text19 : 'Apagar todas as configurações e traços do roteiro no cache do navegador?',
				text20 : 'Fórum',
				text21 : 'Maximizar a largura do fórum',
				text22 : 'Imagem Hotkey',
				text23 : 'Menu Grepolis',
				text24 : 'Senado',
				text25 : 'Mostrar o número de pontos atribuídos para a construção do próximo nível de um edifício',
				text26 : 'Janela de negociação',
				text27 : 'Ative extensão',
				text28 : 'Lista da Cidade',
				text29 : 'Lista de Missões',
				text30 : 'Adicionar uma lista suspensa com suas pastas',
				text31 : 'Botão para o código BB da cidade atual',
				text32 : 'Selecione e exclua mensagens',
				text34 : 'Visão geral Caves (Administrador)',
				text35 : 'Academia planejador',
				text36 : 'Gruta',
				text37 : 'Permitir que a triagem de cidades',
				text38 : 'Digite prata acima 15000 automaticamente no campo de entrada',
				text40 : 'Aldeias barbaras visão geral (Capitão)',
				text41 : 'Adicionar um botão para abrir a vista da cidade ao sidemenu de Greplis',
				text42 : 'Mostrar perdas de recursos',
				text43 : 'Simulador',
				text44 : 'Visão geral Ilha',
				text45 : 'Aumentar a altura da CityList ea lista das aldeias barbaras',
				text46 : 'Tecla de atalho',
				text52 : 'Vista da cidade',
				other : 'Outro',
				save : 'Salvar',
				reset : 'Redefinir as configurações',
				contact : 'Contato',
				info : 'Informações',
				settings : 'Configurações',
				translations : 'Traduções',
				trans_sure : 'Você tem certeza que sua tradução está pronto para enviar?',
				trans_success : 'A tradução foi enviar com êxito',
				trans_fail : 'A tradução não poderia ser enviado',
				trans_infotext1 : 'A tradução não precisa ser completo - apenas traduzir o que você quer',
				trans_infotext2 : 'Quando um texto contém tags HTML (assim tudo que é cercada por <> parênteses) Peço-lhe para mantê-los onde você os encontrou',
				trans_infotext3 : 'A fim de ser capaz de adicioná-lo aos créditos seu nome de jogador, jogador id eo id mundo será transmitido também',
				trans_infotext4 : 'Spammers irá ser adicionado à lista de banidos interno e excluídos da utilização do script',
				please_note : 'Por favor, note',
				credits : 'Creditos',
				no_translation : 'Sem tradução encontrada',
				choose_lang : 'Escolha o idioma',
				add_lang : 'Adicionar um novo idioma',
				language : 'Lingua',
				enter_lang_name : 'Por favor insira um nome de idioma',
				send : 'Enviar',
				name : 'Nome',
				ingame_name : 'Não hesite em contactar-me se você prefere ser chamado pelo seu nome ingame',
				adfly : 'Você quer ganhar dinheiro com as ligações, também?',
				donations : 'Doações',
				prologue : 'Devido à falta de alternativas de uma Devido Falta de Alternativas deuserscripts para Grepolis 2.0 este conjunto de ferramentas foi iniciada dois anos atrás constantemente tenta estender Grepolis com novas funções desde então.<p />Inicialmente, o objectivo era o de reparar as funções de userscripts antigos para Grepolis 1.0 e para aprender as noções básicas de JavaScript no processo, mas por agora muito mais foi realizado. O conjunto de ferramentas é constantemente prorrogado por ideias próprias ou ideias da comunidade e por causa de seu grande apoio a minha motivação para continuar ainda está lá.<p />Você apresenta constantemente me desafios interessantes e é divertido para encontrar soluções para isso. Como se trata de muito trabalho e pode ser muito Eu sou sempre muito grato por qualquer tipo de apoio demorado. Portanto, eu gostaria de agradecer a todos que ofereceram apoio para este projecto - seja através de doações ou clicar em um AdFly-Link, o conhecimento, a criatividade, relatórios de bugs ou apenas algumas palavras de incentivo.'
			},
			bbcode : {
				troops : 'Tropas',
				building : 'Níveis de construção',
				cities : 'Cidades',
				all : 'Tudo',
				active_grp : 'Atividade grupo cidade',
				in : 'Dentro',
				from : 'a partir de',
				outside : 'Fora'
			},
			stats_scripts : {
				stats_scripts_ov : 'Visão geral das estatísticas e os scripts'
			},
			googledocs : {
				change_url : 'Alterar URL',
				reset : 'Restabelecer'
			}
		},
		cz : {
			meta : {
				flag : 'http://s1.directupload.net/images/140507/ctjo8fgu.png'
			},
			reports : {
				choose_folder : 'Vyberte složku',
				spy : 'Špeh',
				support : 'podpora',
				supporting : 'podporující',
				attacking : 'útočící',
				farming_village : 'zemědělská vesnice'
			},
			forum : {
				delete : 'Smazat',
				delete_sure : 'Opravdu chcete smazat tyto příspěvky?',
				no_selection : 'Nebyly vybrány žádné příspěvky'
			},
			town_info : {
				no_overload : 'Bez přeložení',
				delete : 'Smazat',
				inactivity : 'Neaktivita',
				no_data : 'Hráč ještě není zaznamenán v databázi'
			},
			grepo_mainmenu : {
				city_view : 'Přehled města',
				island_view : 'Ostrovní pohled'
			},
			messages : {
				ghosttown : 'Město duchů',
				no_cities : 'Na tomto ostrově nejsou žádná města',
				all : 'vše',
				export : 'Zkonvertuj zprávu do BB-kódu'
			},
			hotkeys : {
				hotkeys : 'Horké klávesy',
				city_select : 'Výběr města',
				last_city : 'Předchozí město',
				next_city : 'Následující město',
				jump_city : 'Přejít na aktuální město',
				administrator : 'Správce',
				captain : 'Kapitán',
				trade_ov : 'Obchod',
				command_ov : 'Rozkazy',
				recruitment_ov : 'Rekrutování',
				troop_ov : 'Přehled vojsk',
				troops_outside : 'Vojsko mimo',
				building_ov : 'Budovy',
				culture_ov : 'Kultura',
				gods_ov : 'Bohové',
				cave_ov : 'Jeskyně',
				city_groups_ov : 'Skupiny měst',
				city_list : 'Seznam měst',
				attack_planner : 'Plánovač útoků',
				farming_villages : 'Zemědělské vesnice',
				city_view : 'Přehled města',
				messages : 'Zprávy',
				reports : 'Hlášení',
				alliance : 'Aliance',
				alliance_forum : 'Fórum aliance',
				settings : 'Nastavení',
				profile : 'Profil',
				ranking : 'Žebříček',
				notes : 'Poznámky',
				council : 'Shromáždění hrdinů'
			},
			qtoolbox : {
				onlinecounter_now : 'Aktuálně',
				onlinecounter_total : 'Celkově',
				onlinecounter_switch : 'Online aktuálně/celkově',
				stats : 'Statistiky',
				player : 'Hráč',
				alliance : 'Aliance',
				rankings : 'Žebříček',
				track_player : 'Vystopuj hráče',
				track_alliance : 'Vystopuj alianci',
				top_killers : 'Nejlepší bojovníci',
				maps : 'Mapy',
				townsearches : 'Vyhledávače měst',
				bb_codes : 'BB-kódy',
				in_town : 'Ve městě',
				from_town : 'Z města',
				outside_town : 'Mimo město',
				tools : 'Nástroje',
				unit_comparison : 'Porovnání jednotek',
				display_modes : 'Módy zobrazení',
				stats_scripts : 'Stats/Skripty',
				settings : 'Manažer skriptu'
			},
			academy : {
				researched : 'Zabarvit vyzkoumané',
				notresearched : 'Zabarvit nevyzkoumané',
				undo : 'Vrať zabarvení'
			},
			caves : {
				stored_silver : 'Uložené stříbrné mince',
				name : 'Jméno',
				wood : 'Dřevo',
				stone : 'Kámen',
				silver : 'Stříbrné mince'
			},
			transport_calc : {
				available : 'Dostupná přepravní kapacita',
				transportable : 'Přepravitelné jednotky',
				recruits : 'Započítej jednotky ve výstavbě',
				outsidetown : 'Započítej jednotky mimo město',
				slowtrans : 'Započítej pomalé transportní lodě',
				fasttrans : 'Započítej rychlé transportní lodě'
			},
			culture : {
				cityfestivals : 'Městské slavnosti',
				olympicgames : 'Olympijské hry',
				triumph : 'Slavnostní pochody',
				theater : 'Divadelní hry'
			},
			settings : {
				text3 : 'Otevírat odkazy z menu přímo ve hře',
				text4 : 'Zahrnout ostatní greasemonkey skripty do menu',
				text5 : 'Ukázat tlačítka pro stálé zobrazení fronty výstavby, pohybů a obchodu',
				text6 : 'Lišta tlačítek',
				text9 : 'Zobrazovat při startu',
				text11 : 'Deaktivovat ukládání celkového času online',
				text13 : 'Displej menu',
				text14 : 'Vlastnosti menu',
				text15 : 'Hlášení',
				text16 : 'Přidat barvu',
				text17 : 'Přidat filtr',
				text18 : 'Aktivovat displej',
				text19 : 'Vymazat všechny stopy a nastavení skriptu ve vyrovnávací paměti prohlížeče?',
				text20 : 'Fórum',
				text21 : 'Maximalizovat šířku fóra',
				text22 : 'Obrázek horkých kláves',
				text24 : 'Senát',
				text25 : 'Ukázovat počet bodů za vybudování další úrovně budovy',
				text26 : 'Okno obchodu',
				text27 : 'Aktivuj rozšíření',
				text28 : 'Town list',
				text30 : 'Přidat vyjížděcí seznam s Vašimi složkami',
				text31 : 'Tlačítko pro BB-kód aktuálního města',
				text32 : 'Vybrat a vymazat příspěvky',
				text34 : 'Přehled jeskyní (Správce)',
				text35 : 'Plánovač výzkumů',
				text36 : 'Jeskyně',
				text37 : 'Povolit řazení měst',
				text38 : 'Automaticky vkládat do vstupního pole stříbrné mince nad 15 000',
				text40 : 'Přehled zemědělských vesnic (Kapitán)',
				text41 : 'Přidat tlačítko pro otevírání přehledu města do postranní lišty Grepolisu',
				text42 : 'Ukazovat ztráty surovin',
				text43 : 'Simulátor',
				text44 : 'Ostrovní pohled',
				text45 : 'Rozšířit výšku seznamu měst a seznamu zemědělských vesnic',
				text46 : 'Horké klávesy',
				text47 : 'Ke skoku na aktuální město použij [Enter] (ne [Space])',
				text48 : 'Otevřít starý pohled na město',
				text49 : 'Seřadit složky hlášení abecedně',
				text52 : 'Přehled města',
				other : 'Ostatní',
				save : 'Uložit',
				reset : 'Resetovat nastavení',
				contact : 'Kontakt',
				settings : 'Nastavení',
				translations : 'Překlady',
				trans_sure : 'Jste si jisti, že Váš překlad je připraven k odeslání?',
				trans_success : 'Překlad byl úspěšně odeslán',
				trans_fail : 'Překlad nemohl být odeslán',
				trans_infotext1 : 'Překlad nemusí být kompletní - přeložte jen to, co chcete',
				trans_infotext2 : 'Pokud text obsahuje HTML tagy (tedy vše obklopené <> závorkami), nechte je, prosím, tam, kde jste je našli',
				trans_infotext3 : 'Abychom Vás mohli přidat do příspěvků, Vaše hráčské jméno, ID a ID Vašeho světa bude také odesláno spolu s tímto příspěvkem',
				trans_infotext4 : 'Spammeři budou přidáni do interního banlistu a nebudou již moci používat tento skript',
				please_note : 'Všimněte si, prosím',
				credits : 'Příspěvky',
				no_translation : 'Nebyl nalezen žádný překlad',
				choose_lang : 'Zvolte jazyk',
				add_lang : 'Přidat nový jazyk',
				language : 'Jazyk',
				enter_lang_name : 'Vložte, prosím, Váš jazyk',
				send : 'Odeslat',
				name : 'Jméno',
				ingame_name : 'Pokud chcete být nazýván Vaším hráčským jménem, neváhejte mě kontaktovat',
				adfly : 'Chcete také vydělávat pomocí odkazů?',
				donations : 'Dary',
				update_check : 'Zkontrolovat aktualizace',
				prologue : 'Vývoj této sady nástrojů byl zahájen před dvěma lety, a to kvůli nedostatku alternativ k uživatelským skriptům pro Grepolis 2.0. Od té doby se snaží stále rozšiřovat Grepolis novými funkcemi.<p />Původním cílem bylo opravit staré skripty pro Grepolis 1.0 a naučit se základy JavaScriptu, ale do nynějška jsme toho již dokázali mnohem víc. Sada je neustále rozšiřována nejen s mými vlatními nápady, ale také s nápady celé komunity a jen díky Vaší podpoře je stále tady. Neustále mi předkládáte nové výzvy a je velmi zábavné hledat jejich řešení.<p />Protože je tato práce náročná, a to i časově, jsem vždy vděčný za jakoukoliv Vaši podporu. Proto chci poděkovat každému, kdo tomuto projektu jakkoliv pomohl - buďto skrze dary nebo klikáním na AdFly-linky, znalostí, kreativitou, hlášením chyb nebo pouze povzbudivými slovy.'
			},
			bbcode : {
				troops : 'Jednotky',
				building : 'Úrovně budov',
				cities : 'Města',
				all : 'Vše',
				active_grp : 'Aktivní skupina měst',
				in : 'v',
				from : 'z',
				outside : 'mimo',
				messages : 'Zprávy'
			},
			stats_scripts : {
				stats_scripts_ov : 'Přehled statistik a skriptů'
			},
			googledocs : {
				change_url : 'Změnit URL'
			}
		},
		de : {
			meta : {
				flag : 'http://s14.directupload.net/images/140408/xpd69nmj.png',
				changelog : 'http://adf.ly/cph8j',
				changelog_addfree : 'https://docs.google.com/document/d/10AyoYbgB1ml30EhSyXF7lDgEw_VqgHIQoJrJPCT0Z3w/edit?usp=sharing',
				forumlink : 'http://adf.ly/cbQaZ',
				forumlink_addfree : 'http://forum.de.grepolis.com/showthread.php?20742',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=DE&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/de_DE/i/btn/btn_donate_LG.gif" alt="Spenden"></a>'
			},
			reports : {
				choose_folder : 'Ordner wählen',
				enacted : 'gewirkt',
				conquered : 'erobert',
				spying : 'spioniert',
				spy : 'Spion',
				support : 'stationierte',
				supporting : 'unterstützt',
				attacking : 'greift',
				farming_village : 'Bauerndorf'
			},
			forum : {
				delete : 'Löschen',
				delete_sure : 'Ausgewählte Beiträge wirklich löschen?',
				no_selection : 'Es sind keine Beiträge markiert'
			},
			town_info : {
				no_overload : 'Kein überladen',
				delete : 'Löschen',
				polissuche : 'Polissuche',
				inactivity : 'Inaktivität',
				days : 'Tage',
				no_data : 'Der Spieler befindet sich noch nicht in der Datenbank'
			},
			grepo_mainmenu : {
				city_view : 'Stadtansicht',
				island_view : 'Inselansicht'
			},
			messages : {
				ghosttown : 'Geisterstadt',
				no_cities : 'Keine Städte auf dieser Insel',
				all : 'Alle',
				export : 'Nachricht als BB-Code für das Forum'
			},
			hotkeys : {
				hotkeys : 'Hotkeys',
				city_select : 'Stadtauswahl',
				last_city : 'Letzte Stadt',
				next_city : 'Nächste Stadt',
				jump_city : 'Sprung zur aktuellen Stadt',
				administrator : 'Verwalter',
				captain : 'Kapitän',
				trade_ov : 'Handelsübersicht',
				command_ov : 'Befehlsübersicht',
				recruitment_ov : 'Rekrutierungsübersicht',
				troop_ov : 'Truppenübersicht',
				troops_outside : 'Truppen außerhalb',
				building_ov : 'Gebäudeübersicht',
				culture_ov : 'Kulturübersicht',
				gods_ov : 'Götterübersicht',
				cave_ov : 'Höhlenübersicht',
				city_groups_ov : 'Stadtgruppenübersicht',
				city_list : 'Städteliste',
				attack_planner : 'Angriffsplaner',
				farming_villages : 'Bauerndörfer',
				menu : 'Menü',
				city_view : 'Stadtansicht',
				messages : 'Nachrichten',
				reports : 'Berichte',
				alliance : 'Allianz',
				alliance_forum : 'Allianz-Forum',
				settings : 'Einstellungen',
				profile : 'Profil',
				ranking : 'Rangliste',
				notes : 'Notizen',
				chat : 'Chat',
				council : 'Konzil der Helden'
			},
			qtoolbox : {
				onlinecounter_now : 'Aktuell',
				onlinecounter_total : 'Total',
				onlinecounter_switch : 'Online aktuell/total',
				stats : 'Statistiken',
				grepostats : 'Grepo Stats',
				player : 'Spieler',
				alliance : 'Allianz',
				rankings : 'Ranglisten',
				grepo_bash : 'Grepo Bash',
				track_player : 'Spieler verfolgen',
				track_alliance : 'Allianz verfolgen',
				top_killers : 'Top Killers',
				maps : 'Karten',
				grepo_maps : 'Grepo Maps',
				grepo_intel : 'Grepo Intel',
				townsearches : 'Stadtsuchen',
				grepo_finder : 'Grepo Finder',
				tonda_polissuche : 'Polissuche',
				bb_codes : 'BB-Codes',
				in_town : 'In Stadt',
				from_town : 'Aus Stadt',
				outside_town : 'Außerhalb Stadt',
				tools : 'Tools',
				unit_comparison : 'Einheiten Vergleich',
				google_docs : 'Google Docs',
				deff_helper : 'Deff Assistent',
				display_modes : 'Anzeige',
				full_screen : 'Vollbild',
				minimal : 'Minimal',
				standard : 'Standard',
				stats_scripts : 'Stats/Skripte',
				settings : 'Skript Manager'
			},
			academy : {
				researched : 'Erforschte markieren',
				notresearched : 'Nicht erforschte markieren',
				undo : 'Markierungen aufheben'
			},
			caves : {
				stored_silver : 'Eingelagerte Silbermünzen',
				silver_to_store: 'Lagerbare Silbermünzen',
				name : 'Name',
				wood : 'Holz',
				stone : 'Stein',
				silver : 'Silbermünzen'
			},
			transport_calc : {
				btn_main : 'Transportrechner',
				available : 'Verfügbare Transportkapazität',
				transportable : 'Zu transportierende Einheiten',
				recruits : 'Truppen in der Bauschleife',
				outsidetown : 'Truppen außerhalb der Stadt',
				slowtrans : 'Langsame Transportboote mitzählen',
				fasttrans : 'Schnelle Transportboote mitzählen',
				disabled : 'Temporär deaktiviert'
			},
			culture : {
				cityfestivals : 'Stadtfeste',
				olympicgames : 'Olympische Spiele',
				triumph : 'Triumphzüge',
				theater : 'Theaterspiele'
			},
			settings : {
				text2 : 'Onlinezähler',
				text3 : 'Links aus dem Menü direkt im Spiel öffnen',
				text4 : 'Hinzufügen von anderen Greasemonkey-Skripten zum Menü aktivieren',
				text5 : 'Buttons für die permanente Anzeige der Rekrutions-/ Bewegungs-/ und Handelsübersicht',
				text6 : 'Buttonleiste',
				text9 : 'Bei Start anzeigen',
				text10 : 'Buttons Stadtverwaltung, Stadt vor/zurück',
				text11 : 'Speicherung der totalen Onlinezeit deaktiviert',
				text12 : 'Transport-Rechner',
				text13 : 'Menü Darstellung',
				text14 : 'Menü Funktionen',
				text15 : 'Berichte',
				text16 : 'einfärben',
				text17 : 'Filtermöglichkeiten aktivieren',
				text18 : 'Anzeige aktivieren',
				text19 : 'Sämtliche Einstellungen und Spuren des Skriptes im Browsercache löschen?',
				text20 : 'Forum',
				text21 : 'Breite des Forum maximieren',
				text22 : 'Hotkey Bild',
				text23 : 'Grepolis Menü',
				text24 : 'Senat',
				text25 : 'Punkte für Gebäude anzeigen',
				text26 : 'Handelsfenster',
				text27 : 'Erweiterung aktivieren',
				text28 : 'Stadtliste',
				text29 : 'Questliste',
				text30 : 'Ordner zusätzlich in einer Auswahlliste anzeigen',
				text31 : 'Button für den BB-Code der aktuellen Stadt',
				text32 : 'Beiträge auswählen und löschen',
				text34 : 'Höhlen Übersicht (Verwalter)',
				text35 : 'Akademie Planer',
				text36 : 'Höhle',
				text37 : 'Sortierung der Städte ermöglichen',
				text38 : 'Silber über 15000 automatisch in das Eingabefeld eintragen',
				text40 : 'Bauerndörfer Übersicht (Kapitän)',
				text41 : 'Einen Button für die Stadtansicht dem Seitenmenü von Grepolis hinzufügen',
				text42 : 'Rohstoffverlustanzeige hinzufügen',
				text43 : 'Simulator',
				text44 : 'Inselübersicht',
				text45 : 'Listen der Städte und Bauerndörfer vergrößern',
				text46 : 'Hotkeys',
				text47 : '[Enter] als Button um zur aktuellen Stadt zu springen (nicht [Space])',
				text48 : 'Alte Stadtansicht öffnen',
				text49 : 'Berichteordner alphabetisch sortieren',
				text50 : 'Questpfeil anzeigen',
				text51 : 'Städte nach dem Farmen automatisch verstecken',
				text52 : 'Stadtansicht',
				text53 : 'Stadtansicht in einem Fenster anzeigen',
				other : 'Sonstiges',
				save : 'Speichern',
				reset : 'Einstellungen zurücksetzen',
				contact : 'Kontakt',
				info : 'Info',
				settings : 'Einstellungen',
				translations : 'Übersetzungen',
				choose_lang : 'Sprache wählen',
				add_lang : 'Neue Sprache hinzufügen',
				language : 'Sprache',
				send : 'Abschicken',
				enter_lang_name : 'Bitte der Sprache einen Namen geben',
				trans_sure : 'Bist du dir sicher, dass deine Übersetzung bereit zum abschicken ist?',
				trans_success : 'Die Übersetzung wurde erfolgreich versandt',
				trans_fail : 'Die Übersetzung konnte nicht gesendet werden',
				trans_infotext1 : 'Die Übersetzung muss nicht komplett sein - übersetzt einfach das wozu ihr Lust habt',
				trans_infotext2 : 'Sollte ein zu übersetzender Text HTML Tags enthalten (also alles was in <> Klammern steht), bitte ich euch darum diese beizubehalten',
				trans_infotext3 : 'Um euch den Credits hinzufügen zu können, wird beim Absenden euer Spielername, eure SpielerID und die WeltenID übermittelt',
				trans_infotext4 : 'Spammer kommen auf eine interne Filterliste und werden vom Gebrauch der Toolsammlung zukünftig ausgeschlossen',
				please_note : 'Hinweise',
				credits : 'Credits',
				no_translation : 'Keine Übersetzungen gefunden',
				ingame_name : 'Wer lieber via ingame Name genannt werden möchte, kann sich gerne bei mir melden',
				adfly : 'Auch mit Links Geld verdienen?',
				donations : 'Spenden',
				update_check : 'Nach Update suchen',
				prologue : 'Aus Mangel an Skriptalternativen für Grepolis 2.0 wurde diese Toolsammlung vor 2 Jahren gestartet und versucht seitdem Grepolis um diverse Funktionen zu erweitern.<p />Anfänglich war es lediglich das Ziel alte Skripte der 1.0 Version wieder funktionstüchtig zu machen und Einblicke in die Funktionsweise von JavaScript zu erhalten. Mittlerweile hat sich jedoch einiges mehr daraus entwickelt. Die Toolsammlung wird stetig durch eigene Ideen oder Ideen aus der Community erweitert und durch euren Support ist die Motivation bis heute erhalten geblieben. Ihr stellt mich dabei immer wieder vor interessante Problemstellungen und es macht Spaß eine Lösung dafür auszutüfteln.<p />Da dies mitunter viel Aufwand und Zeit beansprucht, freue ich mich immer sehr über jede Form von Unterstützung. Deshalb ein großes Danke an alle die dieses Projekt schon solange unterstützen - sei es durch eine Spende oder einen Klick auf einen AdFly-Link, Wissen, Kreativität, Bugberichte oder aufmunternde Worte.'
			},
			bbcode : {
				troops : 'Truppen',
				building : 'Gebäudestufen',
				cities : 'Städte',
				all : 'Alle',
				active_grp : 'Aktive Stadtgruppe',
				in : 'in',
				from : 'aus',
				outside : 'außerhalb von',
				messages : 'Nachrichten'
			},
			stats_scripts : {
				stats_scripts_ov : 'Übersicht Statistiken und Skripte'
			},
			googledocs : {
				change_url : 'Link ändern',
				reset : 'Reset'
			},
			farmhelper : {
				autohide_cities : 'Städte nach dem Farmen automatisch verstecken an/aus'
			}
		},
		es : {
			meta : {
				flag : 'http://s1.directupload.net/images/140408/6lxubx63.png',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=ES&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/es_ES/i/btn/btn_donate_LG.gif" alt="Donar"></a>'
			},
			reports : {
				choose_folder : 'Elegir carpeta',
				enacted : 'promulgado',
				conquered : 'conquistado',
				spying : 'espionaje',
				spy : 'Espíar',
				support : 'Apoyar',
				supporting : 'Apoyos',
				attacking : 'Atacante',
				farming_village : 'Aldea agrícola'
			},
			forum : {
				delete : 'Borrar',
				delete_sure : '¿Realmente desea eliminar estos mensajes?',
				no_selection : 'No hay posts seleccionados'
			},
			town_info : {
				no_overload : 'No cargar',
				delete : 'Borrar',
				polissuche : 'Búsqueda de la ciudad',
				inactivity : 'Inactividad',
				days : 'días',
				no_data : 'El jugador no está listado en la base de datos'
			},
			grepo_mainmenu : {
				city_view : 'Vista de la ciudad',
				island_view : 'Vista de la Isla'
			},
			messages : {
				ghosttown : 'Ciudad fantasma',
				no_cities : 'No hay ciudades en esta isla',
				all : 'Todo',
				export : 'Convertir mensaje en códigos BB'
			},
			hotkeys : {
				hotkeys : 'Atajos de teclado',
				city_select : 'Selección de la ciudad',
				last_city : 'Última ciudad',
				next_city : 'Próxima ciudad',
				jump_city : 'Saltar a la ciudad actual',
				administrator : 'Administrador',
				captain : 'Capitán',
				trade_ov : 'Vista general de comercio',
				command_ov : 'Vista general de órdenes',
				recruitment_ov : 'Vista general de reclutamiento',
				troop_ov : 'Vista de tropas',
				troops_outside : 'Tropas fuera',
				building_ov : 'Vista general de edificios',
				culture_ov : 'Vista de cultura',
				gods_ov : 'Vista general de dioses',
				cave_ov : 'Vista general de la cueva',
				city_groups_ov : 'Vista general de grupos de ciudades',
				city_list : 'Lista de ciudades',
				attack_planner : 'Programador de ataque',
				farming_villages : 'Aldeas',
				menu : 'Menú',
				city_view : 'Vista de la ciudad',
				messages : 'Mensajes',
				reports : 'Informes',
				alliance : 'Alianza',
				alliance_forum : 'Foro de la alianza',
				settings : 'Ajustes',
				profile : 'Perfil',
				ranking : 'Clasificación',
				notes : 'Notas',
				chat : 'Chat',
				council : 'Consejo de héroes'
			},
			qtoolbox : {
				onlinecounter_switch : 'Actual on-line/total',
				stats : 'Estadísticas',
				player : 'Jugador',
				alliance : 'Alianza',
				track_player : 'Seguir un jugador',
				track_alliance : 'Seguir una alianza',
				top_killers : 'Top Atacantes',
				maps : 'Mapas',
				grepo_maps : 'Grepo Mapas',
				townsearches : 'Búsqueda de ciudades',
				tonda_polissuche : 'Buscar ciudad',
				from_town : 'Desde la ciudad',
				outside_town : 'Fuera de la ciudad',
				unit_comparison : 'Comparación de unidades',
				display_modes : 'Modos de pantalla',
				full_screen : 'Pantalla completa',
				minimal : 'Minimizar'
			},
			academy : {
				researched : 'Colorear investigado',
				notresearched : 'Colorear no investigado',
				undo : 'Deshacer coloración'
			},
			caves : {
				stored_silver : 'Monedas de plata almacenables',
				name : 'Nombre',
				wood : 'Madera',
				stone : 'Piedra',
				silver : 'Monedas de plata'
			},
			transport_calc : {
				btn_main : 'Calculadora de Transporte',
				available : 'Capacidad de transporte disponible',
				transportable : 'Unidades transportables',
				recruits : 'Contar unidades en cola de reclutamiento',
				outsidetown : 'Contar unidades fuera de la ciudad',
				slowtrans : 'Contar naves de transporte lentas',
				fasttrans : 'Contar naves de transportes rapidas',
				disabled : 'Deshabilitado temporalmente'
			},
			culture : {
				cityfestivals : 'Festival de la ciudad',
				olympicgames : 'Juegos Olímpicos',
				triumph : 'Marcha triunfal',
				theater : 'Obras de teatro'
			},
			settings : {
				text2 : 'Contador on-line',
				text3 : 'Abrir enlaces del menú dentro del juego',
				text4 : 'Active la inclusión de otros scripts de Greasemonkey al menú',
				text5 : 'Mostrar botones para la exhibición permanente de la cola de la unidad, los movimientos y el comercio',
				text6 : 'Barra de botones',
				text9 : 'Mostrar al inicio',
				text11 : 'Desactivar el tiempo on-line',
				text12 : 'Calculadora de Transporte',
				text13 : 'Pantalla del menú',
				text14 : 'Funciones del menú',
				text15 : 'Reportes',
				text16 : 'Agregar color',
				text17 : 'Agregar filtro',
				text18 : 'Activar pantalla',
				text19 : 'Eliminar todos los ajustes y las cookies de la caché del navegador?',
				text20 : 'Foro',
				text21 : 'Maximizar la pantalla del foro',
				text22 : 'Imagen hotkey',
				text23 : 'Menú Grepolis',
				text24 : 'Senado',
				text25 : 'Mostrar el número de puntos otorgados para la construcción de un nivel superior de un edificio',
				text26 : 'Ventana de comercio',
				text27 : 'Activar extensión',
				text28 : 'Lista de ciudades',
				text29 : 'Lista de colectas',
				text30 : 'Agregar una lista desplegable con las carpetas',
				text31 : 'Botón para el código BB de la ciudad actual',
				text32 : 'Seleccionar y borrar mensajes',
				text34 : 'Resumen de Cuevas (Administrador)',
				text35 : 'Planificar la Academia',
				text36 : 'Cueva',
				text37 : 'Permitir la clasificación de las ciudades',
				text38 : 'Introducir 15.000 monedas de plata automáticamente en el campo de entrada',
				text40 : 'Visión general aldeas agrícolas (Capitán)',
				text41 : 'Agregar un botón para abrir la vista de la ciudad al menú lateral de Grepolis',
				text42 : 'Mostrar recursos perdidos',
				text43 : 'Simulador',
				text44 : 'Visión general de Isla',
				text45 : 'Agrandar la altura de la lista de ciudades y la lista de las aldeas agrícolas',
				text46 : 'Atajos de teclado',
				text47 : 'Utilizar [Enter] como el botón para saltar a la ciudad actual (no [Space])',
				text49 : 'Ordenar por orden alfabético los informes',
				text51 : 'Ocultar automáticamente Ciudades después de la agricultura',
				text52 : 'Vista de la ciudad',
				text53 : 'Mostrar la vista de la ciudad en una ventana',
				other : 'Otros',
				save : 'Salvar',
				reset : 'Restablecer la configuración',
				contact : 'Contacto',
				info : 'Información',
				settings : 'Opciones',
				translations : 'Traducciones',
				trans_sure : '¿Está seguro de que su traducción esta lista para enviar?',
				trans_success : 'La traducción ha sido enviada con éxito',
				trans_fail : 'La traducción no se ha podido enviar',
				trans_infotext1 : 'La traducción no tiene que ser completa - simplemente traduce lo que quieres',
				trans_infotext2 : 'Cuando un texto contiene etiquetas HTML (por lo tanto todo lo que está rodeado de <> entre paréntesis) Les pido que guardes donde las encontraste',
				trans_infotext3 : 'Con el fin de ser capaz de añadir a los créditos el nombre del jugador, id del jugador y el id del mundo se transmitirán así',
				trans_infotext4 : 'Los spammers se añadirán a la lista de ban interna y excluidos de la utilización del script',
				please_note : 'A tener en cuenta',
				credits : 'Créditos',
				no_translation : 'No se encontró traducción',
				choose_lang : 'Elegir idioma',
				add_lang : 'Añadir un nuevo idioma',
				language : 'Idioma',
				enter_lang_name : 'Por favor ingrese el nombre del idioma',
				send : 'Enviar',
				name : 'Nombre',
				ingame_name : 'No dude en ponerse en contacto conmigo si usted prefiere ser llamado por su nombre del juego',
				adfly : '¿Quieres ganar dinero con los enlaces, también?',
				donations : 'Donaciones',
				update_check : 'Buscar actualizaciones',
				prologue : 'Debido a la falta de alternativas de scripts de usuarios para Grepolis 2.0 de este conjunto de herramientas que se inició hace dos años und constantemente trata de extender Grepolis con nuevas funciones desde entonces. Inicialmente el objetivo era reparar las funciones de userscripts edad para Grepolis 1.0 y para aprender los conceptos básicos de JavaScript en el proceso, pero por ahora mucho más se logró. El conjunto de herramientas se amplía constantemente por las ideas propias o ideas de la comunidad y debido a su gran apoyo de mi motivación para continuar todavía está allí. Constantemente me presenta retos interesantes y es divertido para encontrar soluciones para eso. Dado que se trata de mucho trabajo y puede llevar mucho tiempo consumiendo siempre estoy muy agradecido por cualquier tipo de soporte. Por lo tanto me gustaría dar las gracias a todos los que ofreció su apoyo para este proyecto -. Sea a través de donaciones o hacer clic en un AdFly-Link, el conocimiento, la creatividad, los informes de error o sólo algunas palabras alentadoras. Debido a la falta de alternativas de userscripts para Grepolis 2.0 de este conjunto de herramientas se inició hace dos años und constantemente trata de extender Grepolis con nuevas funciones desde entonces.<p />En un principio el objetivo era reparar las funciones de userscripts viejos para Grepolis 1.0 y de aprender los conceptos básicos de JavaScript en el proceso, pero por ahora mucho más se logró. El conjunto de herramientas se amplía constantemente por las ideas propias o ideas de la comunidad y debido a su gran apoyo de mi motivación para continuar todavía está allí. Constantemente me presenta retos interesantes y es divertido para encontrar soluciones para eso.<p />Dado que se trata de mucho trabajo y puede ser muy lento siempre estoy muy agradecido por cualquier tipo de soporte. Por lo tanto me gustaría dar las gracias a todos los que ofreció su apoyo para este proyecto -. Sea a través de donaciones o hacer clic en un AdFly-Link, el conocimiento, la creatividad, los informes de error o sólo algunas palabras alentadoras bbcode'
			},
			bbcode : {
				troops : 'Tropas',
				building : 'Nivel de construcción',
				cities : 'Ciudades',
				all : 'Todo',
				active_grp : 'Grupo de ciudad activa',
				in : 'en',
				from : 'desde',
				outside : 'fuera de',
				messages : 'Mensajes'
			},
			stats_scripts : {
				stats_scripts_ov : 'Visión general de las estadísticas y scripts'
			},
			googledocs : {
				change_url : 'Cambiar URL',
				reset : 'Resetear'
			}
		},
		fr : {
			meta : {
				flag : 'http://s7.directupload.net/images/140408/fo8msuwx.png',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=FR&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/fr_FR/i/btn/btn_donate_LG.gif" alt="Donate"></a>'
			},
			reports : {
				choose_folder : 'Choisissez un dossier',
				enacted : 'promulgué',
				conquered : 'conquérir (ville conquise)',
				spying : 'espionner ',
				spy : 'Espion',
				supporting : 'soutenir',
				attacking : 'attaquer',
				farming_village : 'village agricole'
			},
			forum : {
				delete : 'Supprimer',
				delete_sure : 'Voulez vous réellement effacer ces messages?',
				no_selection : 'Aucun message sélectionnés'
			},
			town_info : {
				delete : 'Effacer',
				polissuche : 'Recherche ville',
				inactivity : 'Inactivité',
				days : 'Jours',
				no_data : "Le joueur n'est pas encore listé dans la base de données"
			},
			grepo_mainmenu : {
				city_view : 'Vue de la ville',
				island_view : "Vue île",
				delete : 'Supprimer'
			},
			messages : {
				ghosttown : 'Ville fantôme',
				no_cities : 'Aucune ville sur cette île',
				all : 'Tous',
				export : 'Convertir le message en BB-Code',
			},
			hotkeys : {
				hotkeys : 'Raccourci',
				city_select : 'Sélection ville',
				last_city : 'Ville précédente',
				next_city : 'Ville suivante',
				jump_city : 'Attendre la ville actuelle',
				administrator : 'Administrateur',
				captain : 'Capitaine',
				trade_ov : 'Aperçu du commerce',
				command_ov : 'Aperçu des ordres',
				recruitment_ov : 'Aperçu du recrutement',
				troop_ov : 'Aperçu des troupes',
				troops_outside : 'Troupes en dehors',
				building_ov : 'Aperçu des bâtiments',
				culture_ov : 'Aperçu culturel',
				gods_ov : 'Aperçu des divinités',
				cave_ov : 'Aperçu des grottes',
				city_groups_ov : 'Aperçu des groupes de villes',
				city_list : 'Liste des villes',
				attack_planner : 'Planificateur',
				farming_villages : 'Villages de paysans',
				menu : 'Menu',
				city_view : 'Vue de la ville',
				messages : 'Messages',
				reports : 'Rapports',
				alliance : 'Alliance',
				alliance_forum : 'Forum d\'alliance',
				settings : 'Réglages',
				profile : 'Profil',
				ranking : 'Rang',
				notes : 'Notes',
				chat : 'Chat',
				council : 'Concile des héros'
			},
			qtoolbox : {
				onlinecounter_now : 'Depuis',
				onlinecounter_total : 'Totale',
				onlinecounter_switch : 'Online depuis/totale',
				stats : 'Statistiques',
				player : 'Joueur',
				alliance : 'Alliance',
				rankings : 'Rang',
				track_player : 'Trouver Joueur',
				track_alliance : 'Trouver Alliance',
				top_killers : 'Meilleurs combattants',
				maps : 'Cartes',
				townsearches : 'Ville-Recherches',
				in_town : 'Dans la ville',
				from_town : 'De la ville',
				outside_town : 'Extérieur de la ville',
				tools : 'Outils',
				display_modes : 'Mode écran',
				full_screen : 'Plein écran'
			},
			academy : {
				researched : 'Colorer recherché',
				notresearched : 'Colorer non recherché',
				undo : 'Annuler coloration'
			},
			caves : {
				stored_silver : 'Capacité de stockage des pièces d\'argent',
				name : 'Nom',
				wood : 'Bois',
				stone : 'Pierre',
				silver : 'Pièces d\'argent'
			},
			transport_calc : {
				btn_main : 'Transports assistant',
				available : 'Capacité disponible',
				transportable : 'Unités transportables',
				recruits : 'Nombre d\'unités dans la queue de recrutement',
				outsidetown : 'Nombre d\'unités en dehors de la ville',
				slowtrans : 'Nombre de transporteurs lents',
				fasttrans : 'Nombre de transporteurs rapides',
				disabled : 'Temporairement désactivé'
			},
			culture : {
				cityfestivals : 'Festivals',
				olympicgames : 'Jeux Olympiques',
				triumph : 'Marche triomphales',
				theater : 'Pièces de théâtre'
			},
			settings : {
				text2 : 'Comptoir en ligne',
				text3 : 'Ouvrir les liens du menu dans le jeu',
				text4 : 'Activer l\'inclusion de scripts Greasemonkey autres au menu',
				text5 : 'Afficher les boutons d\'affichage permanent de l\'unité de file de recrutement, d\'activité et de commerce',
				text6 : 'Barre de boutons',
				text9 : 'Afficher au départ',
				text11 : 'Désactiver l\'enregistrement du temps total en ligne',
				text12 : 'Transports assistant',
				text13 : 'Affichage du menu',
				text14 : 'Fonctions du menu',
				text15 : 'Rapports',
				text16 : 'Ajoutez de la couleur',
				text17 : 'Ajouter filtrer',
				text18 : 'Afficher activé',
				text19 : 'Effacer toutes les traces et personnalisations du script dans le cache du navigateur?',
				text21 : 'Maximiser la largeur du forum',
				text22 : 'Image raccourcis',
				text23 : 'Menu Grepolis',
				text24 : 'Sénat',
				text25 : 'Afficher le nombre de points attribués pour la construction d\'un niveau supérieur d\'un bâtiment',
				text26 : 'Fenêtre de négociation',
				text27 : 'Activer les extension',
				text28 : 'Liste de ville',
				text29 : 'Liste des quest',
				text30 : 'Ajoutez une liste déroulante avec les dossiers',
				text31 : 'Button pour le BB-code de la ville actuelle',
				text32 : 'Sélectionner et supprimer des messages',
				text34 : 'Aperçu des grottes (Administrateur)',
				text35 : 'Planificateurs de l\'Académie',
				text36 : 'Grotte',
				text37 : 'Permettre le tri des villes',
				text38 : 'Entrer argent au-dessus de 15.000 automatiquement dans le champ de saisie',
				text40 : 'L\'aperçu des villages de paysans (Capitaine)',
				text41 : 'Ajouter un bouton pour ouvrir la vue sur la ville au menu de côté sur Grepolis',
				text42 : 'Afficher les pertes de ressources',
				text43 : 'Simulateur',
				text44 : 'Visualisation de l\'île',
				text45 : 'Agrandir la hauteur de la liste des villes et des villages',
				text46 : 'Raccourcis',
				text47 : 'Utiliser [Entrer] comme bouton pour passer à la ville courante (et pas [Espace])',
				text48 : 'Ouvrir l\'ancienne vue de la ville',
				text49 : 'Trier les sorts alphabétiquement',
				text50 : 'Afficher les quêtes',
				text51 : 'Masquer automatiquement la ville',
				text52 : 'Vue de la ville',
				text53 : 'Afficher la ville dans une fenêtre',
				other : 'Autre',
				save : 'Sauver',
				reset : 'Réinitialiser les réglages',
				settings : 'Paramètres',
				translations : 'Traductions',
				trans_sure : 'Etes vous sur que votre traduction est prête à être envoyée ?',
				trans_success : 'La traduction a été envoyée avec succès',
				trans_fail : 'La traduction ne peut pas être envoyée',
				trans_infotext1 : 'La traduction n\'a pas besoin d\'être complète - traduisez juste ce que vous voulez',
				trans_infotext2 : 'Quand du texte contient des balises HTML (tout ce qui est entouré par des <> ) je vous demande de les laisser au même endroit où vous les avez trouvé',
				trans_infotext3 : 'Afin de pouvoir vous ajouter aux crédits, votre pseudo, identifiant et votre numéro de monde seront également envoyé',
				trans_infotext4 : 'Les spammeurs seront ajoutés à la liste noir interne et ne pourront plus utiliser le script',
				please_note : 'Notez',
				no_translation : 'Traduction non trouvée',
				choose_lang : 'Sélectionner la langue',
				add_lang : 'Ajouter une langue',
				language : 'Langue',
				enter_lang_name : 'Entrer un nom de langue',
				send : 'Envoyer',
				name : 'Nom',
				ingame_name : 'N\'hésitez pas à me contacter si vous préférez être appeler par votre pseudo.',
				adfly : 'Voulez vous également gagner de l\'argent avec des lien ?',
				update_check : 'Vérifier les mise à jours',
				prologue : 'A cause du manque de script alternatifs pour Grepolis 2.0, cet outil a été lancé il y a 2 ans et essaye constamment depuis d\'étendre Grepolis avec de nouvelles fonctionnalités.<p />Le but initial était de réparer les fonctions des vieux script pour Grepolis 1.0 et d\'apprendre les bases du Javascript, mais depuis, beaucoup plus a été accomplis. Mon outil est constamment étendu par mes propres idées, ou celles de la communauté, et grâce à votre support, ma motivation à continuer est toujours là. Vous me présentez constamment de nouveaux défis, et c\'est très amusant d\'en trouver les solutions.<p />Comme il y a beaucoup à faire, et que cela peut demander beaucoup de temps, je suis toujours très reconnaissant pour tout type d\'aide. De ce fait, j\'aimerai remercier tous ceux qui ont offert de l\'aide sur ce projet, que ce soit par des donations, en cliquant sur des liens AdFly, en partageant des connaissances, des conseils créatifs, en rapportant des problèmes, ou simplement par des messages d\'encouragement.'
			},
			bbcode : {
				troops : 'Troupes',
				building : 'Les niveaux des bâtiments',
				cities : 'Villes',
				all : 'Toutes',
				active_grp : 'Groupe de villes actif',
				in : 'en',
				from : 'de',
				outside : 'à l\'extérieur de'
			},
			stats_scripts : {
				stats_scripts_ov : 'Aperçu de statistiques et des scripts'
			},
			googledocs : {
				change_url : 'Changer lien',
				reset : 'Ràz'
			}
		},
		gr : {
			meta : {
				flag : 'http://s7.directupload.net/images/140725/ki6kli48.png',
			},
			reports : {
				choose_folder : 'επιλογή φακέλου',
				enacted : 'θεσπιστεί',
				conquered : 'κατακτήθηκε',
				spying : 'κατασκοπεία',
				spy : 'Κατάκσοπος',
				support : 'Υποστήριξη',
				supporting : 'Υποστηρίξεις',
				attacking : 'Επιθέσεις',
				farming_village : 'Αγροτικό χωριό'
			},
			forum : {
				delete : 'Διαγραφή',
				delete_sure : 'Θέλετε να διαγραφεί αυτή η ανάρτηση?',
				no_selection : 'Δεν έχετε επιλέξειανάρτηση'
			},
			town_info : {
				delete : 'Διαγραφή',
				polissuche : 'Εύρεση πόλης',
				inactivity : 'Ανενεργός',
				days : 'Ημέρες',
				no_data : 'Ο παιχτης δεν εχει μπει ακομα στν database'
			},
			grepo_mainmenu : {
				city_view : 'Μπες στην πολη',
				island_view : 'Δες το νησι'
			},
			messages : {
				ghosttown : 'Πόλη φάντασμα',
				no_cities : 'Καμμία πόλη στο νησί',
				all : 'Όλα',
				export : 'Μετατροπή μυνήματος σε BB-Code'
			},
			hotkeys : {
				hotkeys : 'Συντομεύσεις Πληκτρολογίου',
				city_select : 'Επιλογή πόλης',
				last_city : 'Τελευταία πόλη',
				next_city : 'Επόμενη πόλη',
				jump_city : 'Πηγαίνει στην σωστή πόλη',
				administrator : 'Διαχειριστής',
				captain : 'Καπετάνιος',
				trade_ov : 'Συνναλαγή',
				command_ov : 'Εντολές',
				recruitment_ov : 'Στρατολογηση',
				troop_ov : 'Επισκοπηση Στρατευματων',
				troops_outside : 'Στρατευματα Εξω',
				building_ov : 'Κτίρια',
				culture_ov : 'Κουλτούρα',
				gods_ov : 'Θεότητες',
				cave_ov : 'Σπηλιές',
				city_groups_ov : 'Ομάδες πόλεων',
				city_list : 'Λίστα πόλεων',
				attack_planner : 'Πλάνο επίθεσης',
				farming_villages : 'Αγροτικά χωριά',
				menu : 'Μενού',
				city_view : 'Προεπισκόπηση πόλης',
				messages : 'Μυνήματα',
				reports : 'Αναφορές',
				alliance : 'Συμμαχία',
				alliance_forum : 'Φορουμ Συμμαχίας',
				settings : 'Ρυθμίσεις',
				profile : 'Προφίλ',
				ranking : 'Κατάταξη',
				notes : 'Σημειώσεις',
				chat : 'Συνομηλία',
				council : 'Συμβούλιο Ηρώων'
			},
			qtoolbox : {
				onlinecounter_total : 'Σύνολο',
				stats : 'Στατιστικά',
				grepostats : 'Στατιστικά Grepolis',
				player : 'Παίκτης',
				alliance : 'Συμμαχία',
				rankings : 'Κατάταξη',
				track_player : 'Εύρεση παίκτη',
				track_alliance : 'Εύρεση συμμαχίας',
				maps : 'Χάρτης'
			}
		},
		hu : {
			meta : {
				flag : 'http://s1.directupload.net/images/140422/3k2lqw68.png',
			},
			reports : {
				choose_folder : 'Válaszz mappát',
				enacted : 'elfogadott',
				conquered : 'meghódított',
				spying : 'kémkedés',
				spy : 'Kém',
				support : 'támogatás',
				supporting : 'támogatás',
				attacking : 'támadás',
				farming_village : 'falvak farmolása'
			},
			forum : {
				delete : 'Törlés',
				delete_sure : 'Biztos törölni szeretnéd ezt a bejegyzést?',
				no_selection : 'Nincsnek kiválasztott megjegyzések'
			},
			town_info : {
				no_overload : 'Nincs túlterhelés',
				delete : 'Törlés',
				polissuche : 'Városkeresés',
				inactivity : 'Inaktivitás',
				days : 'nap',
				no_data : 'A játékos még nincs listázva az adatbázisban'
			},
			grepo_mainmenu : {
				city_view : 'Város nézet',
				island_view : 'Sziget nézet'
			},
			messages : {
				ghosttown : 'Szellem város',
				no_cities : 'Ezen a szigeten nincs város',
				all : 'mind',
				export : 'Üzenet BB-Code-ba konvertálása'
			},
			hotkeys : {
				hotkeys : 'Gyorsparancsok',
				city_select : 'Város kiválasztás',
				last_city : 'Előző város',
				next_city : 'Következő város',
				jump_city : 'Ugrás az aktuális városra',
				administrator : 'Parancsnok',
				captain : 'Kapitány',
				trade_ov : 'Kereskedelem',
				command_ov : 'Parancsok',
				recruitment_ov : 'Toborzás',
				troop_ov : 'Csapat áttekintés',
				troops_outside : 'Kinti csapatok',
				building_ov : 'Épületek',
				culture_ov : 'Kúltúra',
				gods_ov : 'Istenek',
				cave_ov : 'Vermek',
				city_groups_ov : 'Város csoportok',
				city_list : 'Város lista',
				attack_planner : 'Támadástervező',
				farming_villages : 'Falvak farmolása',
				menu : 'Menü',
				city_view : 'Város nézet',
				messages : 'Üzenetek',
				reports : 'Jelentések',
				alliance : 'Szövetség',
				alliance_forum : 'Szövetségi fórum',
				settings : 'Beállítások',
				profile : 'Profil',
				ranking : 'Helyezés',
				notes : 'Feljegyzések',
				council : 'Hősök Világa'
			},
			qtoolbox : {
				onlinecounter_now : 'Most',
				onlinecounter_total : 'Összes',
				onlinecounter_switch : 'Eltöltött idő most/összes',
				stats : 'Statisztika',
				grepostats : 'Grepo statisztika megnyitása',
				player : 'Játékos',
				alliance : 'Szövetség',
				rankings : 'Ranglista',
				grepo_bash : 'Grepo bash megnyitása',
				track_player : 'Játékos elhelyezkedése',
				track_alliance : 'Szövetség elhelyezkedése',
				top_killers : 'Legtöbb harcipont',
				maps : 'Térképek',
				grepo_maps : 'Grepo mappák megnyitása',
				grepo_intel : 'Grepo információk megnyitása',
				townsearches : 'Város keresések',
				grepo_finder : 'Grepo kereső megnyitása',
				tonda_polissuche : 'Városkeresés',
				bb_codes : 'BB-Kódok',
				in_town : 'Városban',
				from_town : 'Városból',
				outside_town : 'Városon kívül',
				tools : 'Eszközök',
				unit_comparison : 'Összehasonlítás',
				google_docs : 'Google dokumentumok',
				deff_helper : 'Deff segítő',
				display_modes : 'Kijelző módok',
				full_screen : 'Teljes képernyő',
				minimal : 'Minimális',
				standard : 'Alap',
				stats_scripts : 'Statisztikák/Scriptek'
			},
			academy : {
				researched : 'Kifejlesztett színezése',
				notresearched : 'Nem kifejlesztett színezése',
				undo : 'Színezés visszavonása'
			},
			caves : {
				stored_silver : 'Elraktározható ezüstpénzek',
				name : 'Név',
				wood : 'Fa',
				stone : 'Kő',
				silver : 'Ezüstpénz'
			},
			transport_calc : {
				btn_main : 'Szállítási idő számláló',
				available : 'Rendelkezésre álló szállítási kapacitás',
				transportable : 'Szállítható egységek',
				recruits : 'Számolja a kiképzés alatt álló egységeket',
				outsidetown : 'Számolja a városon kívüli egységeket',
				slowtrans : 'Számolja a szállítóhajókat',
				fasttrans : 'Számolja a gyors szállítóhajókat',
				disabled : 'Ideiglenesen nem elérhető'
			},
			culture : {
				cityfestivals : 'Városi fesztiválok',
				olympicgames : 'Olimpiai játékok',
				triumph : 'Diadalmenetek',
				theater : 'Színházi játékok'
			},
			settings : {
				text2 : 'Onlineszámoló',
				text3 : 'Linkek megnyitása a menüből a játékban',
				text4 : 'Aktiválja a többi greasemonkey scriptet',
				text5 : 'Mutassa az egységek kiképzési sorrendjének, a mozgásoknak és a kereskedelemnek a kapcsolóit az állandó kijelzőn',
				text6 : 'Gombsor',
				text9 : 'Kijelzés indításkor',
				text11 : 'A teljes eltöltött idő mentésének kikapcsolása',
				text12 : 'Szállítási idő számláló',
				text13 : 'Menü megjelenítés',
				text14 : 'Menü tulajdonságok',
				text15 : 'jelentések',
				text16 : 'Szín hozzáadása',
				text17 : 'Szűrő hozzáadása',
				text18 : 'Kijelző aktiválása',
				text19 : 'Törölsz minden scriptet és beállítást a gyorsítótárból és az előzményekből?',
				text20 : 'Fórum',
				text21 : 'Maximális szélesség',
				text22 : 'Gyorsparancs kép',
				text23 : 'Grepolis menü',
				text24 : 'Szenátus',
				text25 : 'Kiírja, mennyi pontot kapsz, ha bővíted az épületet',
				text26 : 'Kereskedés ablak',
				text27 : 'Bővítmény aktiválása',
				text28 : 'Város lista',
				text29 : 'Küldetés lista',
				text30 : 'Hozzáad egy legördülő listát a mappáiddal',
				text31 : 'Város BB-kódja',
				text32 : 'Válassz ki és törölj megjegyzéseket',
				text34 : 'Vermek áttekintése (parancsnok)',
				text35 : 'Akadémia tervező',
				text36 : 'Verem',
				text37 : 'Engedélyezze a városok rendezését',
				text38 : 'Engedélyezi egyszerre több mint 15ezer ezüst beírását a beviteli mezőbe',
				text40 : 'Farmolható faluk áttekintése (Kapitány szükséges)',
				text41 : 'Hozzáad egy "Város nézet" gombot a menühöz',
				text42 : 'Kiírja a vesztett nyersanyagokat',
				text43 : 'Szimulátor',
				text44 : 'Sziget áttekintő',
				text45 : 'Megnöveli a városlista és a farmolható faluk listájának a magasságát',
				text47 : '[Enter] használata az aktuális városhoz ugrásra (nem [Space])',
				text48 : 'Régi városnézet megnyitása',
				text49 : 'Jelentések mappa ABC sorrendbe rendezése',
				text50 : 'Küldetésnyíl mutatása',
				text51 : 'Városok automatikus elrejtése farmolás után',
				text52 : 'Város nézet',
				text53 : 'Városnézet megnyitása új ablakban',
				other : 'Másik',
				save : 'Mentés',
				reset : 'Beállítások visszaállítása',
				contact : 'Kapcsolat',
				settings : 'Beállítások',
				translations : 'Fordítás',
				trans_sure : 'Biztos vagy benne, hogy a fordításod kész arra hogy elküldd?',
				trans_success : 'Sikeresen elküldted a fordítást',
				trans_fail : 'A fordítás nem lett elküldve',
				trans_infotext1 : 'A fordítás nincs teljesen kész - fordíts amit szeretnél',
				trans_infotext2 : 'Ha egy szöveg HTML-t tartalmaz ( < > között ) akkor megkérdezlek, biztosan szeretnéd-e használni.',
				trans_infotext3 : 'Azért hogy hozzáadhassunk a készítőkhöz, a játékosneved, játékos azonosítód és a világ azonosítód is hozzá lesz kapcsolva',
				trans_infotext4 : 'A spammelők hozzá lesznek adva a Ban-listához én nem tudják majd használni a scriptet.',
				please_note : 'Kérlek vedd figyelembe',
				credits : 'Készítők',
				no_translation : 'Nem találtunk fordítást',
				choose_lang : 'Válaszz nyelvet',
				add_lang : 'Új nyelv hozzáadása',
				language : 'Nyeév',
				enter_lang_name : 'Írd be a nyelv nevét',
				send : 'Küldés',
				name : 'Név',
				ingame_name : 'Ne habozz jelezni, ha inkább a játékban használt nevedet használnád',
				adfly : 'Szeretnél pénzt szerezni linkekkel is?',
				donations : 'Támogatások',
				update_check : 'Frissítés ellnőrzése',
				prologue : 'Mivel kevés különböző userscript létezik a Grepolis 2.0-hoz, ez a finomhangoló program 2 éve indult és azóta is folyamatosan törekszik a játék újabb funkciókkal való bővítésére.<p />Eleinte a Grepolis 1.0-hoz készült régi userscriptek kijavítása volt és a JavaScript alapjainak megtanulása közben, de mostanra ennél sokkal több valósult meg. A finomhangoló program folyamatosan bővítve lett saját és a közösség ötleteivel és a nagy támogatásotok a folytatásra sarkall. Folyamatosan érdekes kihívások elé állítotok és szórakoztató a megoldások megkeresése.<p />Mindig nagyon boldogan segítek bármilyen formában, habár ez sok munkát és időt jelent. Ezért szeretném megköszönni mindenkinek, aki támogatta ezt a project-et - akár anyagi, AdFly-Link kattintással, tudással, kreativitással, hibajelentéssel vagy csak néhány bíztató szóval.'
			},
			bbcode : {
				troops : 'Csapatok',
				building : 'Építkezési szintek',
				cities : 'Városok',
				all : 'Összes',
				active_grp : 'Aktív város csoport',
				in : 'itt',
				from : 'itt',
				outside : 'kívül itt',
				messages : 'Üzenetek'
			},
			stats_scripts : {
				stats_scripts_ov : 'Statisztikák és szkriptek attekintése'
			},
			googledocs : {
				change_url : 'Link cserélése',
				reset : 'Újra'
			}
		},
		it : {
			meta : {
				flag : 'http://s7.directupload.net/images/140422/rxk9hlkk.png',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=IT&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/it_IT/i/btn/btn_donate_LG.gif" alt="Donate"></a>'
			},
			reports : {
				enacted : 'lavorato',
				conquered : 'catturato',
				spying : 'spia',
				spy : 'Spia',
				support : 'di stanza',
				supporting : 'supporta',
				attacking : 'attacca',
				farming_village : 'villaggio rurale'
			},
			forum : {
				delete : 'Cancella'
			},
			grepo_mainmenu : {
				city_view : 'Panoramica città',
				delete : 'Cancella'
			},
			messages : {
				ghosttown : 'Città fantasma',
				no_cities : 'Nessuna città su quest\'isola'
			},
			hotkeys : {
				hotkeys : 'Tasti di scelta rapida',
				city_select : 'Selezione città',
				last_city : 'Precedente città',
				next_city : 'Prossima città',
				jump_city : 'Salta alla città attuale',
				administrator : 'Amministratore',
				captain : 'Capitano',
				trade_ov : 'Panoramica commercio',
				command_ov : 'Panoramica ordini',
				recruitment_ov : 'Panoramica reclutamento',
				troop_ov : 'Panoramica truppe',
				troops_outside : 'Truppe esterne',
				building_ov : 'Panoramica edifici',
				culture_ov : 'Panoramica cultura',
				gods_ov : 'Panoramica dei',
				cave_ov : 'Panoramica caverne',
				city_groups_ov : 'Panoramica gruppi di città',
				city_list : 'Elenco città',
				attack_planner : 'Pianificatore attacchi',
				farming_villages : 'Villaggi rurali',
				city_view : 'Panoramica città',
				messages : 'Messaggi',
				reports : 'Rapporti',
				alliance : 'Alleanza',
				alliance_forum : 'Forum-Alleanza',
				settings : 'Impostazioni',
				profile : 'Profilo',
				ranking : 'Classifica',
				notes : 'Note',
				council : 'Concilio degli eroi'
			},
			qtoolbox : {
				stats : 'Statistiche',
				player : 'Giocatore',
				alliance : 'Alleanza',
				rankings : 'Classifiche',
				track_player : 'Analisi giocatore',
				track_alliance : 'Analisi alleanza',
				top_killers : 'Top attaccanti',
				maps : 'Mappe',
				townsearches : 'Ricerca-città',
				in_town : 'Truppe in città',
				from_town : 'Truppe della città',
				outside_town : 'Truppe esterne',
				tools : 'Strumenti',
				unit_comparison : 'Confronto unità',
				display_modes : 'Modalità schermo',
				full_screen : 'Schermo intero',
				minimal : 'Minima',
				stats_scripts : 'Statistiche/script'
			},
			caves : {
				stored_silver : 'Monete d\'argento incorporati',
				name : 'Nome',
				wood : 'Legname',
				stone : 'Pietre',
				silver : 'Monete d\'argento'
			},
			transport_calc : {
				btn_main : 'Calcolo trasporti',
				available : 'Capacità di trasporto disponibile',
				transportable : 'Unità trasportabili'
			},
			culture : {
				cityfestivals : 'Festa cittadina',
				olympicgames : 'Giochi Olimpici',
				triumph : 'Corteo trionfale',
				theater : 'Opere teatrali'
			},
			settings : {
				text2 : 'Contatore online',
				text3 : 'Apri link dal menu del gioco',
				text4 : 'Attiva l\'inclusione di altri script greasemonkey al menu',
				text5 : 'Mostra pulsanti per la visualizzazione permanente delle code di unità, movimenti e commercio',
				text6 : 'Barra dei pulsanti',
				text9 : 'Mostra all\'avvio',
				text11 : 'Disattiva il salvataggio del totale tempo online',
				text12 : 'Calcolo trasporti',
				text14 : 'Caratteristiche menu',
				text15 : 'Rapporti',
				text16 : 'Aggiungi colore',
				text17 : 'Aggiungi filtro',
				text18 : 'Attiva display',
				text19 : 'Cancella tutte le impostazioni e le tracce dello script nella cache del browser?',
				text21 : 'Espandi la larghezza del forum',
				text22 : 'Immagine tasti di scelta rapida',
				text23 : 'Menu Grepolis',
				text24 : 'Senato',
				text25 : 'Mostra il numero di punti assegnati per la costruzione del prossimo livello di un edificio',
				text26 : 'Trading finestra',
				text27 : 'Attiva estensione',
				text28 : 'Lista città',
				text29 : 'Lista di quest',
				text34 : 'Panoramica caverna (Amministratore)',
				text35 : 'Accademia pianificatori',
				text36 : 'Caverna',
				text40 : 'La panoramica dei villaggi (Capitano)',
				text43 : 'Simulatore',
				text52 : 'Panoramica città',
				other : 'Altro',
				save : 'Salva',
				reset : 'Resetta impostazioni',
				contact : 'Contatto',
				translations : 'Traduzioni',
				donations : 'Donazioni'
			},
			bbcode : {
				troops : 'Truppe',
				building : 'Livelli di costruzione',
				from : 'da',
				outside : 'fuori da'
			},
			stats_scripts : {
				stats_scripts_ov : 'Panoramica di statistiche e script'
			},
			googledocs : {
				change_url : 'Cambia URL'
			}
		},
		nl : {
			meta : {
				flag : 'http://s14.directupload.net/images/140408/bn8q27or.png',
				forumlink : 'http://adf.ly/fJEZ2',
				forumlink_addfree : 'http://forum.nl.grepolis.com/showthread.php?18043',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=NL&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/nl_NL/i/btn/btn_donate_LG.gif" alt="Donatie"></a>'
			},
			reports : {
				choose_folder : 'Map kiezen',
				enacted : 'ingezet',
				conquered : 'veroverd',
				spying : 'verkent',
				spy : 'spion',
				supporting : 'steunt',
				attacking : 'aanvallen',
				farming_village : 'boerendorp'
			},
			forum : {
				delete : 'Verwijderen',
				delete_sure : 'Wil je deze berichten echt verwijderen?',
				no_selection : 'Geen berichten geselecteerd'
			},
			town_info : {
				no_overload : 'niet overbelasten',
				delete : 'Verwijderen',
				polissuche : 'stedenzoeker',
				inactivity : 'Inactief',
				days : 'dagen',
				no_data : 'De speler is nog niet in de database opgenomen'
			},
			grepo_mainmenu : {
				city_view : 'Stadsoverzicht',
				island_view : 'Eilandoverzicht'
			},
			messages : {
				ghosttown : 'Spookstad',
				no_cities : 'Geen steden op dit eiland',
				all : 'alle',
				export : 'Converteer bericht in BB-code'
			},
			hotkeys : {
				hotkeys : 'Sneltoetsen',
				city_select : 'Stedenkeuze',
				last_city : 'Vorige stad',
				next_city : 'Volgende stad',
				jump_city : 'Spring naar de huidige stad',
				administrator : 'Bestuurder',
				captain : 'Kapitein',
				trade_ov : 'Handel',
				command_ov : 'Bevelen',
				recruitment_ov : 'Rekrutering',
				troop_ov : 'Troepenoverzicht',
				troops_outside : 'Troepen buiten',
				building_ov : 'Gebouwen',
				culture_ov : 'Cultuur',
				gods_ov : 'Goden',
				cave_ov : 'Grotten',
				city_groups_ov : 'Stadsgroepen',
				city_list : 'Stedenlijst',
				attack_planner : 'Aanvalsplanner',
				farming_villages : 'Boerendorpen',
				city_view : 'Stadsoverzicht',
				messages : 'Berichten',
				reports : 'Rapporten',
				alliance : 'Alliantie',
				alliance_forum : 'Alliantieforum',
				settings : 'Instellingen',
				profile : 'Profiel',
				ranking : 'Ranglijst',
				notes : 'Notities',
				council : 'Raad van Helden'
			},
			qtoolbox : {
				onlinecounter_now : 'Actueel',
				onlinecounter_total : 'Totaal',
				onlinecounter_switch : 'Online actueel/totaal',
				stats : 'Statistieken',
				player : 'Speler',
				alliance : 'Alliantie',
				rankings : 'Ranglijsten',
				track_player : 'Volg een speler',
				track_alliance : 'Volg een alliantie',
				top_killers : 'Top Aanvallers',
				maps : 'Kaart',
				townsearches : 'Stedenzoeker',
				tonda_polissuche : 'Stedenzoeker',
				in_town : 'In stad',
				from_town : 'Uit stad',
				outside_town : 'Buiten stad',
				unit_comparison : 'Unit vergelijking',
				display_modes : 'Weergave',
				full_screen : 'Volledig scherm',
				minimal : 'Minimaal',
				standard : 'Standaard'
			},
			academy : {
				researched : 'Onderzochte technologieën markeren',
				notresearched : 'Niet onderzochte technologieën markeren',
				undo : 'Markeringen opheffen'
			},
			caves : {
				stored_silver : 'Opgeslagen zilverstukken',
				name : 'Naam',
				wood : 'Hout',
				stone : 'Steen',
				silver : 'Zilverstukken'
			},
			transport_calc : {
				btn_main : 'Rekenmachine',
				available : 'Beschikbare capaciteit',
				transportable : 'Vervoerbare eenheden',
				recruits : 'Eenheden in de rekruteringsrij meetellen',
				outsidetown : 'Eenheden buiten de stad meetellen',
				slowtrans : 'Langzame transportboten meetellen',
				fasttrans : 'Snelle transportboten meetellen'
			},
			culture : {
				cityfestivals : 'Stadsfeest',
				olympicgames : 'Olympische Spelen',
				triumph : 'Zegetocht',
				theater : 'Theatervoorstellingen'
			},
			settings : {
				text2 : 'Onlineteller',
				text3 : 'Links van het menu direct binnen het spel openen',
				text4 : 'Activeer de integratie van andere Greasemonkey scripten in het menu',
				text5 : 'Toon de buttons voor de permanente weergave van de troepen rekrutering, activiteiten en handel',
				text6 : 'Knoppenbalk',
				text9 : 'Bij het opstarten tonen',
				text11 : 'Het opslaan van de totale online tijd afzetten',
				text12 : 'Transport rekenaar',
				text13 : 'Menu weergave',
				text14 : 'Menu functies',
				text15 : 'Rapporten',
				text16 : 'Kleur toevoegen',
				text17 : 'Filter toevoegen',
				text18 : 'Weergave geactiveerd',
				text21 : 'Breedte van het forum maximaliseren',
				text22 : 'Sneltoets afbeelding',
				text23 : 'Grepolis menu',
				text24 : 'Senaat',
				text25 : 'Toon het aantal toegekende punten voor de bouw van een gebouw',
				text26 : 'Handelsvenster',
				text27 : 'Extensie activeren',
				text28 : 'Stad lijst',
				text29 : 'Quest lijst',
				text30 : 'Dropdown lijst met alle mappen toevoegen',
				text31 : 'Button voor de BB-code van de huidige stad',
				text32 : 'Berichten selecteren en verwijderen',
				text34 : 'Grottenoverzicht (Bestuurder)',
				text35 : 'Academie planner',
				text36 : 'Grot',
				text37 : 'Het sorteren van steden mogelijk maken',
				text38 : 'Silver over 15000 automatisch in het invoerveld toevoegen',
				text40 : 'Boerendorpen overzicht (Kapitein)',
				text41 : 'Een button voor het openen van de stadsoverzicht aan het zijkant menu toevoegen',
				text42 : 'Toon de verloren grondstoffen',
				text44 : 'Eiland overzicht',
				text52 : 'Stadsoverzicht',
				other : 'Overige',
				save : 'Opslaan',
				reset : 'Reset instellingen',
				settings : 'Instellingen',
				translations : 'Vertalingen',
				trans_sure : 'Weet u zeker dat uw vertaling klaar is te verzenden?',
				trans_success : 'De vertaling is succesvol verstuurd',
				trans_fail : 'De vertaling kan niet worden verzonden',
				trans_infotext1 : 'De vertaling hoeft niet compleet te zijn - vertaal wat je wilt',
				trans_infotext2 : 'Wanneer een tekst HTML-tags bevat(dus alles dat wordt omgeven door <> haakjes) Vraag ik u om hen te houden waar u ze hebt gevonden.',
				trans_infotext3 : '',
				trans_infotext4 : 'Spammers zullen worden toegevoegd aan de interne banlist en uitgesloten worden van het gebruik van het script.',
				please_note : 'Let op',
				no_translation : 'Geen vertaling gevonden',
				choose_lang : 'Kies een taal',
				add_lang : 'Voer een taal in',
				language : 'Taal',
				enter_lang_name : 'Alstublieft voer een taal in ',
				send : 'Sturen',
				name : 'Naam',
				ingame_name : 'Aarzel niet om mij te contacteren indien u liever genoemd wilt worden door uw ingame naam',
				adfly : 'Wil je ook geld verdienen met links?',
				donations : 'Donaties',
			},
			bbcode : {
				troops : 'Troepen',
				building : 'Gebouw niveaus',
				cities : 'Steden',
				all : 'Alle',
				active_grp : 'Actieve Stadsgroep',
				in : 'in',
				from : 'van',
				outside : 'buiten'
			},
			stats_scripts : {
				stats_scripts_ov : 'Overzicht over statistieken en scripten'
			},
			googledocs : {
				change_url : 'URL wijzigen'
			},
			farmhelper : {
				autohide_cities : 'Steden automatisch verbergen na farmen aan/af'
			}
		},
		pl : {
			meta : {
				flag : 'http://s7.directupload.net/images/140408/yno6pw5g.png',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=PL&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/pl_PL/i/btn/btn_donate_LG.gif" alt="Donate"></a>'
			},
			reports : {
				choose_folder : 'Wybierz folder',
				enacted : 'Rzuciłeś',
				conquered : 'podbiło',
				spying : 'szpieguje',
				spy : 'Szpieg',
				support : 'wsparcie',
				supporting : 'wspiera',
				attacking : 'atakuje',
				farming_village : 'wioskę'
			},
			forum : {
				delete : 'Usunąć',
				delete_sure : 'Czy na pewno chcesz usunąć te posty?',
				no_selection : 'Brak zaznaczonych Postów'
			},
			town_info : {
				no_overload : 'Wybierz i napełnij łódki',
				delete : 'Wyczyść',
				polissuche : 'szukaj miasta',
				inactivity : 'Nieaktywny',
				days : 'dni',
				no_data : 'Gracz jeszcze nie został dodany do bazy'
			},
			grepo_mainmenu : {
				city_view : 'Podgląd miasta',
				island_view : 'Podgląd wyspy'
			},
			messages : {
				ghosttown : 'Opuszczone miasto',
				no_cities : 'Brak miast na tej wyspie',
				all : 'Całość',
				export : 'Zmień wiadomość na BB-Code'
			},
			hotkeys : {
				hotkeys : 'Skróty',
				city_select : 'Wybór miasta',
				last_city : 'Poprzednie miasto',
				next_city : 'Następne miasto',
				jump_city : 'Przejdź do obecnego miasta',
				administrator : 'Zarządca',
				captain : 'Kapitan',
				trade_ov : 'Podgląd handlu',
				command_ov : 'Podgląd poleceń',
				recruitment_ov : 'Podgląd rekrutacji',
				troop_ov : 'Podgląd wojsk',
				troops_outside : 'Wojska poza miastem',
				building_ov : 'Podgląd budynków',
				culture_ov : 'Podgląd kultury',
				gods_ov : 'Podgląd bogów',
				cave_ov : 'Podgląd jaskini',
				city_groups_ov : 'Podglad grupy miast',
				city_list : 'Lista miast',
				attack_planner : 'Planer ataków',
				farming_villages : 'Wioski',
				menu : 'Menu',
				city_view : 'Podgląd miasta',
				messages : 'Wiadomości',
				reports : 'Raporty',
				alliance : 'Sojusz',
				alliance_forum : 'Forum sojuszu',
				settings : 'Ustawienia',
				profile : 'Profil',
				ranking : 'Ranking',
				notes : 'Notatnik',
				chat : 'Czat',
				council : 'Rada Bohaterów'
			},
			qtoolbox : {
				onlinecounter_now : 'Aktualnie',
				onlinecounter_total : 'Całkowicie',
				onlinecounter_switch : 'Czas przed grą: aktualnie/całkowicie',
				stats : 'Statystyki',
				grepostats : 'Grepo Stats',
				player : 'Gracz',
				alliance : 'Sojusz',
				rankings : 'Rankingi',
				grepo_bash : 'Grepo Bash',
				track_player : 'Sledź Gracza',
				track_alliance : 'Sledź Sojusz',
				top_killers : 'Czołowi Agresorzy',
				maps : 'Mapy',
				grepo_maps : 'Grepo Maps',
				grepo_intel : 'Grepo Intel',
				townsearches : 'Szukanie miast',
				grepo_finder : 'Grepo Finder',
				tonda_polissuche : 'Szukanie miasta',
				bb_codes : 'BB-Code',
				in_town : 'W mieście',
				from_town : 'Z miasta',
				outside_town : 'Na zewnątrz miasta',
				tools : 'Narzędzia',
				unit_comparison : 'Porównaj jednostki',
				google_docs : 'Dokumenty Google',
				deff_helper : 'Deff Pomocnik',
				display_modes : 'Wyświetlanie',
				full_screen : 'Pełny ekran',
				minimal : 'Ograniczone',
				standard : 'Standardowe',
				stats_scripts : 'Statystyki/skrypty',
				settings : 'Menadżer skryptu.'
			},
			academy : {
			researched : 'Oznacz kolorem zbadane',
			notresearched : 'Oznacz kolorem nie zbadane',
			undo : 'Cofnij kolory'
			},
			caves : {
				stored_silver : 'Przechowywane srebrne monety',
				name : 'Nazwa',
				wood : 'Drewno',
				stone : 'Kamień',
				silver : 'Srebrne monety'
			},
			transport_calc : {
				btn_main : 'Kalkulator transportu',
				available : 'Dostępna pojemność transporterów',
				transportable : 'Jednostki do przetransportowania',
				recruits : 'Uwzględniaj jednostki w kolejce rekrutacji',
				outsidetown : 'Uwzględniaj jednostki na zewnątrz miasta',
				slowtrans : 'Uwzględniaj szybkie łodzie',
				fasttrans : 'Uwzględniaj wolne łodzie',
				disabled : 'Tymczasowo nieaktywne'
			},
			culture : {
				cityfestivals : 'Festyn miejski',
				olympicgames : 'Igrzyska Olimpijskie',
				triumph : 'Pochód triumfalny',
				theater : 'Występy teatralne'
			},
			settings : {
				text2 : 'Licznik czasu on-line',
				text3 : 'Otwieraj linki z menu w grze',
				text4 : 'Aktywuj działanie innych skryptów Greasmonkey w menu',
				text5 : 'Pokaż przyciski stałego wyświetlania się kolejki rekrutacji, ruchów i handlu',
				text6 : 'Pasek przycisków',
				text9 : 'Pokaż podczas startu',
				text11 : 'Dezaktywuj zapisywanie całkowitego czasu on-line',
				text12 : 'Kalkulator transportowców',
				text13 : 'Wygląd Menu',
				text14 : 'Opcje Menu',
				text15 : 'Raporty',
				text16 : 'Dodaj kolor',
				text17 : 'Dodaj filtr',
				text18 : 'Aktywuj podgląd',
				text19 : 'Usunąć wszystkie ustawienia i obecność skryptu w pamięci cache przeglądarki?',
				text20 : 'Forum',
				text21 : 'Zmaksymalizuj szerokość forum',
				text22 : 'Ikonka skrótów',
				text23 : 'Menu Grepolis',
				text24 : 'Senat',
				text25 : 'Pokaż liczbę punktów przyznaną za zbudowanie następnego poziomu budynku',
				text26 : 'Okno handlu',
				text27 : 'Aktywuj przedłużanie',
				text28 : 'Lista miast',
				text29 : 'Lista zadań',
				text30 : 'Dodaj wyskakującą listę w folderach',
				text31 : 'Guzik z kodem BB-code aktualnego miasta',
				text32 : 'Zaznaczanie i usuwanie postów',
				text34 : 'Podgląd jaskiń (Zarządca)',
				text35 : 'Pomocnik badań w akademi',
				text36 : 'Jaskinia',
				text37 : 'Możliwość sortowania miast',
				text38 : 'Wstaw automatycznie w pole wpisywania srebro powyżej 15000',
				text40 : 'Podgląd wiosek (Kapitan)',
				text41 : 'Dodaj guzik "Podgląd Miasta" do menu',
				text42 : 'Pokaż straty surowców',
				text43 : 'Symulator',
				text44 : 'Podgląd wyspy',
				text45 : 'Powiększ listę miast i wiosek w podglądzie wyspy',
				text46 : 'Skróty klawiszowe',
				text47 : 'Użyj [Enter] jako klawisz przełączania do obecnego miasta (nie [Space])',
				text48 : 'Otwieraj podgląd miasta w starym stylu',
				text49 : 'Segreguj foldery raportów według alfabetu',
				text51 : 'Autoukrywanie miast po zebraniu surowców z wiosek',
				text52 : 'Podgląd miasta',
				text53 : 'Wyświetl podgląd miasta w oknie',
				other : 'Inne',
				save : 'Zapisz',
				reset : 'Zresetuj ustawienia',
				contact : 'Kontakt',
				info : 'Informacja',
				settings : 'Ustawienia',
				translations : 'Tłumaczenia',
				trans_sure : 'Czy jesteś pewien że twoje tłumaczenie jest gotowe do wysłania?',
				trans_success : 'Tłumaczenie zostało wysłane',
				trans_fail : 'Tłumaczenie nie może zostać wysłane',
				trans_infotext1 : 'Tłumaczenie nie musi być kompletne - po prostu tłumacz co chcesz',
				trans_infotext2 : 'Jeżeli tekst zawiera tagi HTML (czyli wszystko co jest zawarte w <> klamrach) proszę ich nie usuwać ani nie modyfikować',
				trans_infotext3 : 'Aby móc dodać cię do listy tłumaczących, twoja nazwa gracza, identyfikator gracza i kraju/świata zostanie przekazany automatycznie',
				trans_infotext4 : 'Spamerzy będą banowani i dodawani do czarnej listy',
				please_note : 'Proszę się zapoznać',
				credits : 'Dotychczasowi tłumaczący',
				no_translation : 'Nie odnaleziono tłumaczenia',
				choose_lang : 'Wybierz język',
				add_lang : 'Dodaj nowy jęzzyk',
				language : 'Język',
				enter_lang_name : 'Proszę podać nazwę języka',
				send : 'Wyślij',
				name : 'Nazwa',
				ingame_name : 'Nie wahaj się ze mną skontaktować, jeśli wolisz być nazywany tak jak w grze',
				adfly : 'Czy chcesz zarabiać także pieniądze na linkach?',
				donations : 'Darowizny',
				update_check : 'Sprawdź czy jest nowsza wersja'
			},
			bbcode : {
				troops : 'Jednostki',
				building : 'Poziomy budynków',
				cities : 'Miasta',
				all : 'Wszystkie',
				active_grp : 'Aktywna grupa miast',
				in : 'w',
				from : 'z',
				outside : 'na zewnątrz',
				messages : 'Wiadomości'
			},
			stats_scripts : {
				stats_scripts_ov : 'Podgląd statystyk i skryptów'
			},
			googledocs : {
				change_url : 'Zmień URL',
				reset : 'Resetuj'
			},
			farmhelper : {
				autohide_cities : 'Autoukrywanie miast po zebraniu surowców z wiosek rolniczych wł/wył'
			}
		},
		ro : {
			meta : {
				flag : 'http://s1.directupload.net/images/140818/uqbqdqcf.png',
			},
			reports : {
				choose_folder : 'Alege un folder',
				enacted : 'decretat',
				conquered : 'cucerit',
				spying : 'spionaj',
				spy : 'Spion',
				support : 'suport',
				supporting : 'sprijinire',
				attacking : 'ataca',
				farming_village : 'sat de farmat'
			},
			forum : {
				delete : 'Sterge',
				delete_sure : 'Esti sigur ca vrei sa stergi acest post?',
				no_selection : 'Nici un post selectat'
			},
			town_info : {
				no_overload : 'Nu supraincarcati',
				delete : 'Sterge',
				polissuche : 'cautare oras',
				inactivity : 'Inactivitate',
				days : 'zile',
				no_data : 'Acest jucator nu este inca listat in baza de date'
			},
			grepo_mainmenu : {
				city_view : 'Vezi Oras',
				island_view : 'Vezi Insula'
			},
			messages : {
				ghosttown : 'Oras fantoma',
				no_cities : 'Nici un oras pe aceasta insula',
				all : 'toate',
				export : 'Converteste mesajul in BB-Code'
			},
			hotkeys : {
				hotkeys : 'Taste',
				city_select : 'Selectare oras',
				last_city : 'Ultimul oras',
				next_city : 'Urmatorul oras',
				jump_city : 'Salt la orasul curent',
				captain : 'Capitan',
				trade_ov : 'Negot',
				command_ov : 'Comenzi',
				recruitment_ov : 'Recrutare',
				troop_ov : 'Privire de ansamblu a trupelor',
				troops_outside : 'Trupe din afara orasului',
				building_ov : 'Constructii',
				culture_ov : 'Cultura',
				gods_ov : 'Zei',
				cave_ov : 'Pesteri',
				city_groups_ov : 'Grupe orase',
				city_list : 'Lista orase',
				attack_planner : 'Planificator atacuri',
				farming_villages : 'Sate de farmat',
				menu : 'Meniu',
				city_view : 'Vezi oras ',
				messages : 'Mesaje',
				reports : 'Rapoarte',
				alliance : 'Alianta',
				alliance_forum : 'Forum Alianta',
				settings : 'Setari',
				profile : 'Profil',
				ranking : 'Clasament',
				notes : 'Notite',
				council : 'Consiliul eroilor'
			},
			qtoolbox : {
				onlinecounter_now : 'Curent',
				onlinecounter_switch : 'Online curent/total',
				stats : 'Statistici',
				player : 'Jucator',
				alliance : 'Alianta',
				rankings : 'Clasament',
				track_player : 'Urmareste un jucator',
				track_alliance : 'Urmareste o alianta',
				top_killers : 'Top ucigasi/asasini',
				maps : 'Mape',
				tonda_polissuche : 'Cautare oras',
				in_town : 'In oras',
				from_town : 'Din oras',
				outside_town : 'In afara orasului',
				tools : 'Instrumente',
				unit_comparison : 'Comparare unitati',
				google_docs : 'Documente Google',
				deff_helper : 'Ajutator Deff',
				display_modes : 'Modul Afisaj',
				full_screen : 'Tot ecranul',
				minimal : 'Minim',
				stats_scripts : 'Statistici/Scripturi',
				settings : 'Manager script'
			},
			academy : {
				researched : 'Colorati cercetarea',
				notresearched : 'Nu colorati cercetarea',
				undo : 'Anulare colorare'
			},
			caves : {
				stored_silver : 'Monede de argint stocate',
				silver_to_store : 'Monede de argint ce pot fi stocate',
				name : 'Nume',
				wood : 'Lemn',
				stone : 'Piatra',
				silver : 'Monede de argint '
			},
			transport_calc : {
				btn_main : 'Calculator transport',
				available : 'Capacitate de transport disponibila',
				transportable : 'Unitati transportabile',
				recruits : 'Numar unitati in asteptare de recrutare',
				outsidetown : 'Numar unitati din afara orasului',
				slowtrans : 'Numar transportoare incete',
				fasttrans : 'Numar transportoare rapide',
				disabled : 'Temporar scos din uz '
			},
			culture : {
				cityfestivals : 'Festival oras',
				olympicgames : 'Jocuri olimpice',
				triumph : 'Parada triumfala',
				theater : 'Piese de teatru'
			},
			settings : {
				text2 : 'Contrare Online',
				text3 : 'Deschide linkurile din meniul in joc',
				text4 : 'Activati includerea altor scripturi Greasemonkey in meniu',
				text5 : 'Arata butoanele pentru afisarea permanenta a unitatilor in asteptare, miscarile si comertul',
				text6 : 'Buton bara',
				text9 : 'Afisaj la pornire',
				text11 : 'Dezactiveaza economisirea din totalul timp online',
				text12 : 'Calculator de transport',
				text13 : 'Meniu afisaj',
				text14 : 'Caracteristici meniu ',
				text15 : 'Reporturi',
				text16 : 'Adauga culoare',
				text17 : 'Adauga filtru',
				text18 : 'Activeaza afisaj',
				text19 : 'Stergi toate setarile si urmele ale scripturilor in ascunzatoarea browserului?',
				text21 : 'Maximizati latimea forumului ',
				text22 : 'Taste imagine',
				text23 : 'Meniu grepolis',
				text24 : 'Senat',
				text25 : 'Arata numarul de puncte primite din constructia urmatorului nivel al cladiri',
				text26 : 'Fereastra de negot',
				text27 : 'Activeaa extensia',
				text28 : 'Lista orase',
				text29 : 'Lista misiuni',
				text30 : 'Adauga o lista verticala cu foldere',
				text31 : 'Buton pentru BB-Code a orasului curent',
				text32 : 'Selecteaza si sterge posturi',
				text34 : 'Privire de ansamblu asupra pesterilor(Administrator)',
				text35 : 'Planificator academie',
				text36 : 'Pestera',
				text37 : 'Permite sortarea oraselor',
				text38 : 'Introdu 1500 monede de argint automat in campul selectat',
				text40 : 'Privire de ansamblu a satelor de farmat(Captain)',
				text41 : 'Adauga buton pentru deschiderea "vezi orasul" in meniul lateral al Grepolisului ',
				text42 : 'Arata resurse pierdute',
				text44 : 'Privire ansamblu insula',
				text45 : 'Mareste inaltimea listei orasele si lista de orase farmat',
				text46 : 'Taste',
				text47 : 'Foloseste [ENTER] ca buton pentru a sari la orasul curent',
				text48 : 'Deschide vechiul "vezi orasul"',
				text49 : 'Sorteaza alfabetiv foldere de report',
				text50 : 'Afiseaza sageata misiune',
				text51 : 'Ascunde automat orasele dupa farmat',
				text52 : 'Vezi oras',
				text53 : 'Afiseaza vederea orasului in fereastra',
				other : 'Altele',
				save : 'Salveaza ',
				reset : 'Reseteaza salvarile',
				info : 'Informatii',
				settings : 'Setari',
				translations : 'Traduceri',
				trans_sure : 'Esti sigur ca traducerea ta este gata sa fie trimisa?',
				trans_success : 'Traducerea a fost trimis cu succes',
				trans_fail : 'Traducerea nu a putut fi trimisa',
				trans_infotext1 : 'Traducerea nu trebuie sa fie completa, doar traduce ce vrei tu',
				trans_infotext4 : 'Spammeri vor fi adaugati in lista de blocare si vor fi exclusi din a utiliza acest script',
				please_note : 'Nota',
				credits : 'Credite',
				no_translation : 'Nici o traducere gasita',
				choose_lang : 'Alege o limba',
				add_lang : 'Adauga o noua limba',
				language : 'Limba',
				enter_lang_name : 'Introdu numele limbii',
				send : 'Trimite',
				name : 'Nume',
				ingame_name : 'Nu ezita sa ma contactezi daca preferi sa fi numit dupa numele de joc',
				adfly : 'Vrei sa castigi bani cu linkuri de asemenea?',
				donations : 'Donatii',
				update_check : 'Cautate update'
			},
			bbcode : {
				troops : 'Trupe',
				building : 'Nivel cladire',
				cities : 'Orase',
				all : 'Toate',
				active_grp : 'grupa oras activ',
				from : 'din',
				outside : 'in afara',
				messages : 'Mesaje'
			},
			stats_scripts : {
				stats_scripts_ov : 'Prezentare generala a statisticilor si scripturilor'
			},
			googledocs : {
				change_url : 'Schimba URL',
				reset : 'Resetare'
			},
			farmhelper : {
				autohide_cities : 'Ascundere automata a oraselor dupa farmaj pornire/oprire '
			}
		},
		ru : {
			meta : {
				flag : 'http://s1.directupload.net/images/140408/7bsp2aye.png',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=RU&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/ru_RU/i/btn/btn_donate_LG.gif" alt="Donate"></a>'
			},
			reports : {
				choose_folder : 'Выбрать каталог',
				enacted : 'принятый',
				conquered : 'завоеванный',
				spying : 'шпионаж',
				spy : 'шпион',
				support : 'поддержка',
				supporting : 'поддерживающий',
				attacking : 'атакующий',
				farming_village : 'селения'
			},
			forum : {
				delete : 'Удалить',
				delete_sure : 'Вы действительно хотите удалить эти сообщения?',
				no_selection : 'Сообщения не выбраны'
			},
			town_info : {
				no_overload : 'Нет перезагрузки',
				delete : 'Удалить',
				polissuche : 'Поиск города',
				inactivity : 'Бездействие',
				days : 'Дни',
				no_data : 'Игрок не найден в базе данных'
			},
			grepo_mainmenu : {
				city_view : 'Обзор города',
				island_view : 'Обзор острова'
			},
			messages : {
				ghosttown : 'Город-призрак',
				no_cities : 'На этом острове нет городов',
				all : 'Все',
				export : 'Конвертировать сообщение в BB-Код'
			},
			hotkeys : {
				hotkeys : 'Горячие клавиши',
				city_select : 'Выбор города',
				last_city : 'Последний город',
				next_city : 'Следующий город',
				jump_city : 'Переход к текущему городу',
				administrator : 'Администратор',
				captain : 'Капитан',
				trade_ov : 'Обзор торговли',
				command_ov : 'Обзор приказов',
				recruitment_ov : 'Обзор вербовок',
				troop_ov : 'Обзор войск',
				troops_outside : 'Войска вне города',
				building_ov : 'Обзор зданий',
				culture_ov : 'Обзор культуры',
				gods_ov : 'Обзор богов',
				cave_ov : 'Обзор пещер',
				city_groups_ov : 'Обзор групп городов',
				city_list : 'Список городов',
				attack_planner : 'Планировщик',
				farming_villages : 'Селения земледельцев',
				menu : 'Меню',
				city_view : 'Обзор города',
				messages : 'Сообщения',
				reports : 'Отчеты',
				alliance : 'Союз',
				alliance_forum : 'Форум Союза',
				settings : 'Настройки',
				profile : 'Профиль',
				ranking : 'Рейтинг',
				notes : 'Заметки',
				chat : 'Чат',
				council : 'Совет героев'
			},
			qtoolbox : {
				onlinecounter_now : 'Текущий',
				onlinecounter_total : 'Общий',
				onlinecounter_switch : 'Онлайн текущий/всего',
				stats : 'Статистика',
				grepostats : 'Grepo Статистика',
				player : 'Игрок',
				alliance : 'Союз',
				rankings : 'Рейтинг',
				track_player : 'Следить за игроком',
				track_alliance : 'Следить за Альянсом',
				top_killers : 'Топ атакеров',
				maps : 'Карты',
				grepo_maps : 'Grepo Карты',
				townsearches : 'Поисковик городов',
				grepo_finder : 'Grepo Поисковик',
				tonda_polissuche : 'Поиск городов',
				bb_codes : 'ББ-коды',
				in_town : 'В городе',
				from_town : 'Из города',
				outside_town : 'Вне города',
				tools : 'Инструменты',
				unit_comparison : 'Сравнение юнитов',
				google_docs : 'Google Документы',
				deff_helper : 'Deff помощник',
				display_modes : 'Режим экрана',
				full_screen : 'Полный экран',
				minimal : 'Минимализированный',
				standard : 'Стандартный',
				stats_scripts : 'Разработчики/Скрипты',
				settings : 'Менеджер скриптов'
			},
			academy : {
				researched : 'Выделить изученное',
				notresearched : 'Выделить неизученное',
				undo : 'Отменить выделение'
			},
			caves : {
				stored_silver : 'Встроенные cереб. монеты',
				name : 'название',
				wood : 'древесина',
				stone : 'камень',
				silver : 'Сереб. монеты'
			},
			transport_calc : {
				btn_main : 'Калькулятор транспорта',
				available : 'Доступная вместимость транспорта',
				transportable : 'Перевозимые юниты',
				recruits : 'Подсчитать юнитов в очереди обучения',
				outsidetown : 'Подсчитать юнитов вне города',
				slowtrans : 'Подсчитать медленных транспортных юнитов',
				fasttrans : 'Подсчитать быстрых транспортных юнитов'
			},
			culture : {
				cityfestivals : 'Фестиваль',
				olympicgames : 'Олимпийские игры',
				triumph : 'Шествие',
				theater : 'Представление'
			},
			settings : {
				text2 : 'Время онлайн',
				text3 : 'Открыть ссылки в окне игры',
				text4 : 'Активируйте включение других скриптов в меню.',
				text5 : 'Постоянно показывать кнопки Очереди стройки юнитов, передвижения и торговли',
				text6 : 'Меню кнопок',
				text9 : 'Показывать при запуске',
				text12 : 'Калькулятор транспорта',
				text13 : 'Показывать меню',
				text14 : 'Список функций',
				text15 : 'Отчеты',
				text16 : 'Добавить цвет',
				text17 : 'Добавить фильтр',
				text18 : 'Включить на весь экран',
				text19 : 'Удалить все настройки скрипта из кеша браузера?',
				text20 : 'Форум',
				text21 : 'Увеличить размер форума',
				text22 : 'Значок "Быстрых клавиш"',
				text23 : 'Меню Grepolis',
				text24 : 'Сенат',
				text25 : 'Показать количество очков, нужных для постройки следующего уровня здания',
				text26 : 'Окно торговли',
				text27 : 'Активировать дополнение',
				text28 : 'Список городов',
				text29 : 'Список заданий',
				text30 : 'Добавить выпадающий список с вашими папками',
				text31 : 'BB-code текущего города',
				text32 : 'Выбрать и удалить сообщения форума',
				text34 : 'Обзор пещеры (Администратор)',
				text35 : 'Академия планированию',
				text36 : 'Пещера',
				text37 : 'Разрешить сортировку городов',
				text38 : 'Поместить 15000 серебра автоматически в поле ввода',
				text40 : 'Обзор селений земледельцев (Капитан)',
				text41 : 'Добавить кнопку для открытия Обзора города в подменю Grepolis',
				text42 : 'Показать потерянные ресурсы',
				text43 : 'Симулятор',
				text44 : 'Обзор острова',
				text46 : 'Быстрые клавиши',
				text47 : 'Использовать клавишу [Enter] для перехода к текущему городу. (не [Пробел])',
				text48 : 'Открыть старый вид Обзора города',
				text49 : 'Сортировать папки отчетов в алфавитном порядке',
				text52 : 'Обзор города',
				other : 'Другое',
				save : 'Сохранить',
				reset : 'Сброс настроек',
				contact : 'контакт',
				info : 'информация',
				settings : 'Настройки',
				translations : 'Переводы',
				trans_sure : 'Вы уверены? Ваша версия перевода будет отослана разработчику.',
				trans_success : 'Версия перевода успешно отправлена.',
				trans_fail : 'Отправка перевода не удалась.',
				trans_infotext1 : 'Данная версия перевода неполная - при желании можете перевести.',
				trans_infotext2 : 'Текст кода содержит HTML (всё, заключенное в угловые скобки <> прошу не изменять)',
				trans_infotext3 : 'Дабы добавить вас в Титры, ваш никнейм и игровой мир будут переданы разработчику.',
				trans_infotext4 : 'Спамеры будут добавлены в Черный список и их внесенные данные в код скрипта, будут удалены.',
				credits : 'Помощники проекта:',
				no_translation : 'Перевод не найден.',
				choose_lang : 'Выбор языка',
				add_lang : 'Добавить новый язык',
				language : 'Язык',
				enter_lang_name : 'Укажите название языка',
				send : 'Послать',
				name : 'Имя',
				ingame_name : 'Не стесняйтесь обращаться ко мне, чтобы я указал ваш игровой ник.',
				adfly : 'Вы хотите заработать деньги по ссылкам?',
				donations : 'Пожертвования',
				update_check : 'Проверить обновление',
				prologue : 'В связи с отсутствием подобных скриптов на userscripts.org для Grepolis 2.0. Два года назад была начата разработка данного скрипта. Скрипт постоянно пополняется новыми функциями и дополнениями.<p />Я благодарен игрокам за советы и идеи, они дают мне силы работать дальше. К сожалению, проект отнимает очень много времени, поэтому я буду рад любой поддержке.<p />Я хочу поблагодарить всех, кто помогал проекту, будь то Пожертвования или ссылки AdFly-Link, советы, отчеты с ошибками или просто добрые слова в мой адрес.'
			},
			bbcode : {
				troops : 'Войска',
				building : 'Уровень зданий',
				cities : 'Города',
				all : 'все',
				active_grp : 'Активная группа городов',
				in : 'в',
				from : 'из',
				outside : 'вне',
				messages : 'Сообщения'
			},
			stats_scripts : {
				stats_scripts_ov : 'Обзор статистики и скриптов'
			},
			googledocs : {
				change_url : 'Изменить URL',
				reset : 'Сброс'
			}
		},
		en : {
			meta : {
				flag : 'http://s14.directupload.net/images/140408/e2nfyth9.png',
				changelog : 'http://adf.ly/cpi89',
				changelog_addfree : 'https://docs.google.com/document/d/1Q9wIHhXUu6cDUdxr0onT8sHOcSXxpAtbg6R_oOrhiA8/edit?usp=sharing',
				forumlink : 'http://adf.ly/fJDMD',
				forumlink_addfree : 'http://forum.en.grepolis.com/showthread.php?51999',
				donation_btn : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2HJ88ATTBYXSQ&lc=US&item_name=Quack%20Toolsammlung&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" target="_blank"><img src="https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif" alt="Donate"></a>'
			},
			reports : {
				choose_folder : 'Choose folder',
				enacted : 'enacted',
				conquered : 'conquered',
				spying : 'spying',
				spy : 'Spy',
				support : 'support',
				supporting : 'supporting',
				attacking : 'attacking',
				farming_village : 'farming village'
			},
			forum : {
				delete : 'Delete',
				delete_sure : 'Do you really want to delete these posts?',
				no_selection : 'No posts selected'
			},
			town_info : {
				no_overload : 'No overloading',
				delete : 'Delete',
				polissuche : 'townsearch',
				inactivity : 'Inactivity',
				days : 'days',
				no_data : 'The player is not yet listed in the database'
			},
			grepo_mainmenu : {
				city_view : 'City view',
				island_view : 'Island view'
			},
			messages : {
				ghosttown : 'Ghost town',
				no_cities : 'No cities on this island',
				all : 'all',
				export : 'Convert message into BB-Code'
			},
			hotkeys : {
				hotkeys : 'Hotkeys',
				city_select : 'City selection',
				last_city : 'Last city',
				next_city : 'Next city',
				jump_city : 'Jump to current city',
				administrator : 'Administrator',
				captain : 'Captain',
				trade_ov : 'Trade',
				command_ov : 'Commands',
				recruitment_ov : 'Recruiting',
				troop_ov : 'Troop overview',
				troops_outside : 'Troops outside',
				building_ov : 'Buildings',
				culture_ov : 'Culture',
				gods_ov : 'Gods',
				cave_ov : 'Caves',
				city_groups_ov : 'City groups',
				city_list : 'City list',
				attack_planner : 'Attack planner',
				farming_villages : 'Farming villages',
				menu : 'Menu',
				city_view : 'City view',
				messages : 'Messages',
				reports : 'Reports',
				alliance : 'Alliance',
				alliance_forum : 'Alliance forum',
				settings : 'Settings',
				profile : 'Profile',
				ranking : 'Ranking',
				notes : 'Notes',
				chat : 'Chat',
				council : 'Council of Heroes'
			},
			qtoolbox : {
				onlinecounter_now : 'Current',
				onlinecounter_total : 'Total',
				onlinecounter_switch : 'Online current/total',
				stats : 'Statistics',
				grepostats : 'Grepo Stats',
				player : 'Player',
				alliance : 'Alliance',
				rankings : 'Rankings',
				grepo_bash : 'Grepo Bash',
				track_player : 'Track a Player',
				track_alliance : 'Track an Alliance',
				top_killers : 'Top Killers',
				maps : 'Maps',
				grepo_maps : 'Grepo Maps',
				grepo_intel : 'Grepo Intel',
				townsearches : 'Townsearches',
				grepo_finder : 'Grepo Finder',
				tonda_polissuche : 'Townsearch',
				bb_codes : 'BB-Codes',
				in_town : 'In town',
				from_town : 'From town',
				outside_town : 'Outside town',
				tools : 'Tools',
				unit_comparison : 'Unit Comparison',
				google_docs : 'Google Docs',
				deff_helper : 'Deff Helper',
				display_modes : 'Display modes',
				full_screen : 'Full screen',
				minimal : 'Minimal',
				standard : 'Standard',
				stats_scripts : 'Stats/Scripts',
				settings : 'Script manager',
				quo : 'Quo'
			},
			academy : {
				researched : 'Colorize researched',
				notresearched : 'Colorize not researched',
				undo : 'Undo coloration'
			},
			caves : {
				stored_silver : 'Stored silver coins',
				silver_to_store: 'Storable silver coins',
				name : 'Name',
				wood : 'Wood',
				stone : 'Stone',
				silver : 'Silver coins'
			},
			transport_calc : {
				btn_main : 'Transport calculator',
				available : 'Available transport capacity',
				transportable : 'Transportable units',
				recruits : 'Count units in recruitment queue',
				outsidetown : 'Count units outside of city',
				slowtrans : 'Count slow transport ships',
				fasttrans : 'Count fast transport ships',
				disabled : 'Temporarily disabled'
			},
			culture : {
				cityfestivals : 'City festivals',
				olympicgames : 'Olympic Games',
				triumph : 'Victory processions',
				theater : 'Theater plays'
			},
			settings : {
				text2 : 'Onlinecounter',
				text3 : 'Open links from the menu ingame',
				text4 : 'Activate the inclusion of other greasemonkey scripts to the menu',
				text5 : 'Show buttons for permanent display of the unit queue, movements and trade',
				text6 : 'Button bar',
				text9 : 'Display at start',
				text11 : 'Deactivate saving of the total onlinetime',
				text12 : 'Transport calculator',
				text13 : 'Menu display',
				text14 : 'Menu features',
				text15 : 'Reports',
				text16 : 'Add color',
				text17 : 'Add filter',
				text18 : 'Activate display',
				text19 : 'Delete all settings and traces of the script in the browser cache?',
				text20 : 'Forum',
				text21 : 'Maximize the width of the forum',
				text22 : 'Hotkey image',
				text23 : 'Grepolis menu',
				text24 : 'Senate',
				text25 : 'Show the number of points awarded for constructing the next level of a building',
				text26 : 'Tradingwindow',
				text27 : 'Activate extension',
				text28 : 'Town list',
				text29 : 'Quest list',
				text30 : 'Add a dropdown list with your folders',
				text31 : 'Button for the BB-code of the current city',
				text32 : 'Select and delete posts',
				text34 : 'Caves overview (Administrator)',
				text35 : 'Academy planner',
				text36 : 'Cave',
				text37 : 'Allow sorting of cities',
				text38 : 'Enter silver above 15000 automatically into the input field',
				text40 : 'Farming villages overview (Captain)',
				text41 : 'Add a button for opening the city view to the sidemenu of Greplis',
				text42 : 'Show losses of resources',
				text43 : 'Simulator',
				text44 : 'Island overview',
				text45 : 'Enlarge the height of the citylist and the list of the farming villages',
				text46 : 'Hotkeys',
				text47 : 'Use [Enter] as the button to jump to the current city (not [Space])',
				text48 : 'Open the old cityview',
				text49 : 'Sort report folders alphabetically',
				text50 : 'Display of the questarrow',
				text51 : 'Autohide cities after farming',
				text52 : 'City view',
				text53 : 'Display the city view in a window',
				other : 'Other',
				save : 'Save',
				reset : 'Reset settings',
				contact : 'Contact',
				info : 'Info',
				settings : 'Settings',
				translations : 'Translations',
				trans_sure : 'Are you sure that your translation is ready to send?',
				trans_success : 'The translation has been send successfully',
				trans_fail : 'The translation could not be sent',
				trans_infotext1 : 'The translation does not have to be complete - just translate what you want',
				trans_infotext2 : 'When a text contains HTML tags (thus everything which is surrounded by <> brackets) I ask you to keep them where you found them',
				trans_infotext3 : 'In order to be able to add you to the credits your player name, player id and the world id will be transmitted as well',
				trans_infotext4 : 'Spammers will be added to the internal banlist and excluded from using the script',
				please_note : 'Please note',
				credits : 'Credits',
				no_translation : 'No translation found',
				choose_lang : 'Choose language',
				add_lang : 'Add a new language',
				language : 'Language',
				enter_lang_name : 'Please enter a language name',
				send : 'Send',
				name : 'Name',
				ingame_name : 'Do not hesitate to contact me if you prefer to be called by your ingame name',
				adfly : 'Do you want to earn money with links, too?',
				donations : 'Donations',
				update_check : 'Check for update',
				prologue : 'Due to the lack of alternatives of userscripts for Grepolis 2.0 this toolset was started two year ago und constantly tries to extend Grepolis with new functions ever since.<p />Initially the goal was to repair the functions of old userscripts for Grepolis 1.0 and to learn the basics of JavaScript in the process but by now much more was accomplished. The toolset is constantly extended by own ideas or ideas from the community and because of your great support my motivation to continue is still there. You constantly present me interesting challenges and it is fun to find solutions for that.<p />Since this is much work and can be very time-consuming I am always very grateful for any type of support. Therefore I like to thank everyone who offered support for this project - whether through donations or clicking an AdFly-Link, knowledge, creativity, bug reports or just some encouraging words.'
			},
			bbcode : {
				troops : 'Troops',
				building : 'Building levels',
				cities : 'Cities',
				all : 'All',
				active_grp : 'Active city group',
				in : 'in',
				from : 'from',
				outside : 'outside of',
				messages : 'Messages'
			},
			stats_scripts : {
				stats_scripts_ov : 'Overview of stats and scripts'
			},
			googledocs : {
				change_url : 'Change URL',
				reset : 'Reset'
			},
			farmhelper : {
				autohide_cities : 'Ocultar automáticamente las Ciudades después de la agricultura encendido/apagado'
			}
		}
	};

	/************************************************************************
	 * Images
	 ***********************************************************************/
	QT.Images = {
		hotkeys : {
			key : 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QDARXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAExAAIAAAASAAAAWodpAAQAAAABAAAAbAAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTEAAAGShgAHAAAAOgAAAH4AAAAATABFAEEARAAgAFQAZQBjAGgAbgBvAGwAbwBnAGkAZQBzACAASQBuAGMALgAgAFYAMQAuADAAMQAAAP/bAEMABAIDAwMCBAMDAwQEBAQFCQYFBQUFCwgIBgkNCw0NDQsMDA4QFBEODxMPDAwSGBITFRYXFxcOERkbGRYaFBYXFv/bAEMBBAQEBQUFCgYGChYPDA8WFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFv/AABEIABEAEQMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APqbwnpum3WnB7jT7SRlbaGaBScbR3xVX4xadY2vwz1K4s7K3t54xHsliiVHXMqA4IGehP51S0nxt4W8PQ/Yda1iG1uOH8tskgFRycZx0rM+LXxJ8Fah8P7zT9O1yK6urryhFHEj/N+9Rs5IwBgGua65R63PMf7Pi9ZP++jRV7y39vzormuyzmviD/yHtQ/66H+Vct4d/wBcv4UUVT6jR3lFFFAj/9k=',
			city_select : 'data:image/png;base64,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',
			administrator : 'data:image/png;base64,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',
			captain : 'data:image/png;base64,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',
			menu : 'data:image/png;base64,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'
		},
		archer : "http://s1.directupload.net/images/140121/l2xgz8zg.jpg",
		attack_ship : "http://s1.directupload.net/images/140121/mvlqonug.jpg",
		big_transporter : "http://s1.directupload.net/images/140121/shdrwvx4.jpg",
		bireme : "http://s1.directupload.net/images/140121/op3pm7ig.jpg",
		calydonian_boar : "http://s14.directupload.net/images/140121/5qr5nmxo.jpg",
		catapult : "http://s1.directupload.net/images/140121/gv9r6p24.jpg",
		centaur : "http://s7.directupload.net/images/140121/7lytp7ku.jpg",
		cerberus : "http://s14.directupload.net/images/140121/58gsjmi9.jpg",
		chariot : "http://s14.directupload.net/images/140121/vlfs3fmp.jpg",
		colonize_ship : "http://s14.directupload.net/images/140121/zgcvw7q2.jpg",
		demolition_ship : "http://s7.directupload.net/images/140121/h3isd3id.jpg",
		fury : "http://s7.directupload.net/images/140121/97qhkxxu.jpg",
		godsent : "http://s1.directupload.net/images/140121/oc3euuhk.jpg",
		griffin : "http://s7.directupload.net/images/140121/lukxwqlc.jpg",
		harpy : "http://s1.directupload.net/images/140121/7hl9sx8x.jpg",
		hoplite : "http://s1.directupload.net/images/140121/lllk8ef5.jpg",
		manticore : "http://s1.directupload.net/images/140121/dz3wluob.jpg",
		medusa : "http://s14.directupload.net/images/140121/6qgf9chs.jpg",
		militia : "http://s1.directupload.net/images/140121/exvjtpb6.jpg",
		minotaur : "http://s7.directupload.net/images/140121/o8a34o3n.jpg",
		pegasus : "http://s1.directupload.net/images/140121/e8ovbacv.jpg",
		rider : "http://s14.directupload.net/images/140121/39pvt7u6.jpg",
		sea_monster : "http://s14.directupload.net/images/140121/hflh35u5.jpg",
		slinger : "http://s1.directupload.net/images/140121/jtfdfuk9.jpg",
		small_transporter : "http://s14.directupload.net/images/140121/oxgq69a8.jpg",
		sword : "http://s14.directupload.net/images/140121/vpaij5z9.jpg",
		trireme : "http://s14.directupload.net/images/140121/mdzzpxye.jpg",
		zyklop : "http://s1.directupload.net/images/140121/oihz5sop.jpg",
		andromeda : "http://s7.directupload.net/images/140121/4jdz5tso.jpg",
		atalanta : "http://s1.directupload.net/images/140121/yo6vp8l2.jpg",
		cheiron : "http://s1.directupload.net/images/140121/tkpytdq8.jpg",
		ferkyon : "http://s1.directupload.net/images/140121/glncylst.jpg",
		helen : "http://s1.directupload.net/images/140121/m75fi7pf.jpg",
		hercules : "http://s1.directupload.net/images/140121/hnaqid9l.jpg",
		leonidas : "http://s1.directupload.net/images/140121/tskyuwpt.jpg",
		orpheus : "http://s7.directupload.net/images/140121/hfjeztt4.jpg",
		terylea : "http://s7.directupload.net/images/140121/vev4s7z7.jpg",
		urephon : "http://s14.directupload.net/images/140121/jfqewwux.jpg",
		zuretha : "http://s7.directupload.net/images/140121/o6cf8cya.jpg",
	};
	
	/************************************************************************
	 * Links
	 ***********************************************************************/
	QT.Links = {
		GS_Spieler : "http://www." + mID + ".grepostats.com/world/" + wID + "/player/" + sID,
		GS_Allianz : "http://www." + mID + ".grepostats.com/world/" + wID + "/alliance/" + aID,
		GS_Bash : "http://www." + mID + ".grepostats.com/world/" + wID + "/alliance/" + aID + "/members",
		GrepoBash : "http://grepobash.de/show.php?server=" + wID + "&ally=" + aID + "&order=all",
		GrepoMaps : "http://" + wID + ".grepolismaps.org",
		Polissuche_faark : "http://grepo.faark.de/tondasPolisSuche/townSearch.php/" + wID,
		Unitvergleich : "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE#gid=0",
		ForumMax : "http://" + wID + ".grepolis.com/forum",
		Grepofinder : "http://www.drolez.com/grepofinder/" + wID,
		Polissuche : "http://polissuche.marco93.de/" + wID + ".html",
		GrepoIntelMap : "http://grepointel.com/map.php?server=" + wID,
		GrepoIntelPlayer : "http://grepointel.com/track.php?server=" + wID,
		GrepoIntelAlliance : "http://grepointel.com/alliance.php?server=" + wID,
		GrepoIntelKillers : "http://grepointel.com/topkillers.php?server=" + wID,
		gretimes : "http://gretimes.community.grepolis.pl",
		grepostats : "http://www." + mID + ".grepostats.com",
		grepointel : "http://www.grepointel.com",
		grepomaps_main : "http://www.grepolismaps.org",
		grepobash_main : "http://www.grepobash.de",
		grepofinder_main : "http://www.drolez.com/grepofinder/",
		polisssuche_main : "http://polissuche.marco93.de",
		einheitenvergleich : "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE",
		grepoutils : "http://www.grepoutils.webxxs.com",
		abakus : "http://forum.de.grepolis.com/showthread.php?691-Abakus-Der-Grepolis-Rechner",
		grepotool : "http://forum.de.grepolis.com/showthread.php?28359",
		youscreen : "http://www.youscreen.de",
		quacktools : "https://openuserjs.org/scripts/quackmaster/Quack/Quack_Toolsammlung",
		grc : "http://grepolis.potusek.eu/module/installgrc",
		playerprofilescript : "https://openuserjs.org/scripts/Menidan/Grepolis_Spielerprofil_mit_Zur%C3%BCck-Button",
		attackwarner : "http://forum.de.grepolis.com/showthread.php?25986",
		grepotownslist : "http://userscripts-mirror.org/scripts/show/84608.html",
		grepolisrevobericht : "http://forum.de.grepolis.com/showthread.php?29259",
		grepoforen : "http://www.grepoforen.de",
		transportrechner_menidan : "https://openuserjs.org/scripts/Menidan/Grepolis_Transportrechner",
		zeitrechner : "https://openuserjs.org/scripts/Menidan/Grepolis_Zeitrechner",
		diotools : "http://forum.de.grepolis.com/showthread.php?28838",
		bauerndorfalarm : "http://forum.de.grepolis.com/showthread.php?28919",
		quo : "http://www.quo.marekblomkvist.com/" + wID,
		quo_main : "http://www.quo.marekblomkvist.com",
		grepolisqt_main : "http://www.grepolisqt.de",
		grepolisqt : "http://adf.ly/pcChx",
		grepolisqt_facebook : "https://www.facebook.com/grepolisqt",
		revoformatierer : "http://tms-partner.de/Grepolis/revoeingabe.php",
		gs_eroberungsstatistiken : "https://openuserjs.org/scripts/Menidan/Grepolis_Stats_Eroberungsstatistiken"
	};

	/************************************************************************
	 * Settings
	 ***********************************************************************/
	QT.Settings = {
		values : {
			"onlinetotal" : 0,
			"qmenu_online_version" : 0,
			"qmenu_update_next" : 0,
			"script_version" : 0,
			"googledocsurl" : "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dEF3bWs3SW5iWjdyUEE0M0c3Znpmc3c",
			"qmenu_settings_akademieplaner" : true,
			"qmenu_settings_berichte_farben" : true,
			"qmenu_settings_berichte_filter" : true,
			"qmenu_settings_berichte_losses" : true,
			"qmenu_settings_berichte_move" : true,
			"qmenu_settings_berichte_sortfolders" : true,
			"qmenu_settings_buttonbar" : true,
			"qmenu_settings_cityview_BTN" : true,
			"qmenu_settings_cityview_window" : true,
			"qmenu_settings_counter" : true,
			"qmenu_settings_counter_aktiv" : true,
			"qmenu_settings_farmhelper" : true,
			"qmenu_settings_farmhelper_hidecities" : true,
			"qmenu_settings_forumdelete" : true,
			"qmenu_settings_grepopoints" : true,
			"qmenu_settings_hidesilver" : true,
			"qmenu_settings_hidessilver" : true,
			"qmenu_settings_hidessort" : true,
			"qmenu_settings_hotkey_anzeige" : true,
			"qmenu_settings_hotkey_jump" : true,
			"qmenu_settings_hotkey_active" : true,
			"qmenu_settings_island_villages" : true,
			"qmenu_settings_links" : true,
			"qmenu_settings_maximize_forum" : true,
			"qmenu_settings_plusmenu" : true,
			"qmenu_settings_questliste" : true,
			"qmenu_settings_questpfeil" : true,
			"qmenu_settings_stadtliste" : true,
			"qmenu_settings_tradeimprovement" : true,
			"qmenu_settings_transport_rechner" : true,
			"qmenu_settings_townbb" : true
		},
		save : function (name, value) {
			QT_saveValue(name, value);
		},
		save_all : function (valuesToSave) {
			QT_saveAllValues(valuesToSave);
		},
		delete : function (name) {
			QT_deleteValue(name);
		},
		delete_all : function () {
			QT_deleteAllValues();
		},
		setValues : function () {
			for (var opt in DATA) {
				QT.Settings.values[opt] = DATA[opt];
			}
		}
	};

	/************************************************************************
	 * Ajax Call functions
	 ***********************************************************************/
	QT.CallAjaxFunction = {
		index : {
			switch_town : function () {
				if ($("#tr_wrapper").css('display') != 'none')
					QT.Functions.transportcalculator.refresh();
				if (QT.Settings.values.qmenu_settings_hidesilver)
					QT.Functions.hidesIndexIron();
				if (QT.Settings.values.qmenu_settings_cityview_window)
					QT.Functions.city_view_windowTitle();
			}
		},
		report : {
			index : function () {
				if (QT.Settings.values.qmenu_settings_berichte_sortfolders)
					QT.Functions.reportFoldersort();
				if (QT.Settings.values.qmenu_settings_berichte_farben)
					QT.Functions.reportsColor();
				if (QT.Settings.values.qmenu_settings_berichte_move)
					QT.Functions.reportsMove();
				if (QT.Settings.values.qmenu_settings_berichte_filter)
					QT.Functions.reportsFilter();
			},
			move : function () {
				if (QT.Settings.values.qmenu_settings_berichte_sortfolders)
					QT.Functions.reportFoldersort();
				if (QT.Settings.values.qmenu_settings_berichte_farben)
					QT.Functions.reportsColor();
				if (QT.Settings.values.qmenu_settings_berichte_move)
					QT.Functions.reportsMove();
				if (QT.Settings.values.qmenu_settings_berichte_filter)
					QT.Functions.reportsFilter();
			},
			delete_many : function () {
				if (QT.Settings.values.qmenu_settings_berichte_sortfolders)
					QT.Functions.reportFoldersort();
				if (QT.Settings.values.qmenu_settings_berichte_farben)
					QT.Functions.reportsColor();
				if (QT.Settings.values.qmenu_settings_berichte_move)
					QT.Functions.reportsMove();
				if (QT.Settings.values.qmenu_settings_berichte_filter)
					QT.Functions.reportsFilter();
			},
			view : function () {
				if (QT.Settings.values.qmenu_settings_berichte_losses)
					QT.Functions.reportsLosses();
			}
		},
		alliance_forum : {
			forum : function () {
				if (QT.Settings.values.qmenu_settings_maximize_forum)
					QT.Functions.forumMaximize();
				if (QT.Settings.values.qmenu_settings_forumdelete)
					QT.Functions.forumDeleteMultiple();
			}
		},
		town_overviews : {
			hides_overview : function () {
				if (QT.Settings.values.qmenu_settings_hidessilver)
					QT.Functions.hidesoverviewiron();
				if (QT.Settings.values.qmenu_settings_hidessort)
					QT.Functions.hidesSort();
			},
			command_overview : function (event, xhr, settings) {
				QT.Functions.commandOverview(event, xhr, settings);
			},
			culture_overview : function () {
				QT.Functions.cultureOverview();
			},
			start_celebration : function () {
				QT.Functions.cultureOverview();
			},
			start_all_celebrations : function () {
				QT.Functions.cultureOverview();
			}
		},
		building_main : {
			index : function (event, xhr, settings) {
				if (QT.Settings.values.qmenu_settings_grepopoints)
					QT.Functions.grepopoints(event, xhr, settings);
			},
			build : function (event, xhr, settings) {
				if (QT.Settings.values.qmenu_settings_grepopoints)
					QT.Functions.grepopoints(event, xhr, settings);
			},
			cancel : function (event, xhr, settings) {
				if (QT.Settings.values.qmenu_settings_grepopoints)
					QT.Functions.grepopoints(event, xhr, settings);
			},
			tear_down : function (event, xhr, settings) {
				if (QT.Settings.values.qmenu_settings_grepopoints)
					QT.Functions.grepopoints(event, xhr, settings);
			}
		},
		building_barracks : {
			build : function () {
				if ($("#tr_wrapper").css('display') != 'none')
					QT.Functions.transportcalculator.refresh();
			},
			cancel : function () {
				if ($("#tr_wrapper").css('display') != 'none')
					QT.Functions.transportcalculator.refresh();
			}
		},
		building_docks : {
			build : function () {
				if ($("#tr_wrapper").css('display') != 'none')
					QT.Functions.transportcalculator.refresh();
			},
			cancel : function () {
				if ($("#tr_wrapper").css('display') != 'none')
					QT.Functions.transportcalculator.refresh();
			}
		},
		building_place : {
			units_beyond : function () {
				QT.Functions.unitsBeyondView();
			}
		},
		units_beyond_info : {
			send_back_part : function () {
				QT.Functions.unitsBeyondView();
			}
		},
		frontend_bridge : {
			fetch : function () {
				if (QT.Settings.values.qmenu_settings_hidesilver)
					QT.Functions.hidesIndexIron();
				/*if ($('.researches_queue_box').length != 0) {
					QT.Functions.academyMarker();
				}*/
				//if (QT.Settings.values.qmenu_settings_hideaddpoints)
				//QT.Functions.hidesIndexAddPoints();
			},
			execute : function () {
				if ($("#tr_wrapper").css('display') != 'none')
					QT.Functions.transportcalculator.refresh();
				if (QT.Settings.values.qmenu_settings_stadtliste && $('#town_groups_list').is(':visible'))
					QT.Functions.townslist();
				if (QT.Settings.values.qmenu_settings_hidesilver)
					QT.Functions.hidesIndexIron();
				//if (QT.Settings.values.qmenu_settings_hideaddpoints)
				//QT.Functions.hidesIndexAddPoints();
			}
		},
		building_academy : {
			index : function () {
				if (QT.Settings.values.qmenu_settings_akademieplaner)
					QT.Functions.academyMarker();
			},
			research : function () {
				if (QT.Settings.values.qmenu_settings_akademieplaner)
					QT.Functions.academyMarker();
			},
			cancel : function () {
				if (QT.Settings.values.qmenu_settings_akademieplaner)
					QT.Functions.academyMarker();
			},
			revert_research : function () {
				if (QT.Settings.values.qmenu_settings_akademieplaner)
					QT.Functions.academyMarker();
			}
		},
		town_info : {
			info : function () {
				QT.Functions.townInactivity();
				QT.Functions.townGSButton();
			},
			trading : function () {
				if (QT.Settings.values.qmenu_settings_tradeimprovement)
					QT.Functions.townTradeImprovement();
			}
		},
		player : {
			get_profile_html : function (event, xhr, settings) {
				QT.Functions.playerGSButton(event, xhr, settings);
			},
			index : function () {
				QT.Functions.addsettingsbutton();
			}
		},
		island_info : {
			index : function (event, xhr, settings) {
				QT.Functions.islandMessage();
				QT.Functions.islandInactivity(event, xhr, settings);
				QT.Functions.islandAddPlayerlinks(event, xhr, settings);
				if (QT.Settings.values.qmenu_settings_island_villages)
					QT.Functions.islandFarmingVillages();
			}
		},
		alliance : {
			profile : function (event, xhr, settings) {
				QT.Functions.allianceGSButton(event, xhr, settings);
				QT.Functions.allianceInactivity(event, xhr, settings);
			}
		},
		farm_town_overviews : {
			claim_loads : function () {
				if (QT.Settings.values.qmenu_settings_farmhelper)
					QT.Functions.farmingvillageshelper.rememberloot();
					QT.Functions.farmingvillageshelper.indicateLoot();
			},
			get_farm_towns_for_town : function () {
				if (QT.Settings.values.qmenu_settings_farmhelper && typeof activeFarm != 'undefined')
					QT.Functions.farmingvillageshelper.setloot();
			},
			index : function () {
				QT.Functions.farmingvillageshelper.islandHeader();
			}
		},
		message : {
			view : function (event, xhr, settings) {
				QT.Functions.messageViewAll();
				QT.Functions.messageExport();
			},
			new : function () {
				QT.Functions.messageInputwidth();
			}
		}
	};

	/************************************************************************
	 * Functions
	 ***********************************************************************/
	QT.Functions = {
		testButtons : function () {
			$('#ui_box').append('<div id="qt_buttons" style="position: relative;top: 54px;z-index: 100"><button id="qt_save">Save</button><button id="qt_saveall">Save all</button><button id="qt_delete">Delete</button><button id="qt_deleteall">Delete all</button></div>');
			$("#qt_save").click(function () {
				QT.Settings.save("messageOpenAlert", false);
			});
			$("#qt_saveall").click(function () {
				var values = {};
				values.messageOpenAlert = false;
				values.reportOpenAlert = false;
				QT.Settings.save_all(values);
			});
			$("#qt_delete").click(function () {
				QT.Settings.delete("messageOpenAlert");
			});
			$("#qt_deleteall").click(function () {
				QT.Settings.delete_all();
			});
		},
		test : function () {
			alert("Test funktioniert");
		},
		helper : {
			grepo_btn : function (ID, Text) {
				return $('<a id="' + ID + '" href="#" class="button"><span class="left"><span class="right"><span class="middle"><small>' + Text + '</small></span></span></span></a>');
			},
			grepo_dropdown : function (ID, Options) {
				var str = '<span class="grepo_input"><span class="left"><span class="right"><select name="' + ID + '" id="' + ID + '" type="text">';
				$.each(Options, function (a, b) {
					if (QT.Lang[b]) {
						var option_image = QT.Lang[b].meta.flag;
					} else {
						var option_image = "";
					}
					var option_name = (QT.Lang[b]) ? b.toUpperCase() : b;
					str += '<option style="background: url(' + option_image + ') no-repeat scroll left center #EEDDBB; padding-left: 22px" value="' + b + '">' + option_name + '</option>'
				});
				str += '</select></span></span></span>';
				return $(str);
			},
			grepo_input : function (Style, ID, Text) {
				return $('<div class="input_box" style="' + Style + '"><span class="grepo_input"><span class="left"><span class="right"><input id="' + ID + '" type="text" value="' + Text + '"></span></span></span></div>');
			},
			grepo_submenu : function (ID, Title) {
				return $('<li><a id="' + ID + '" class="submenu_link" href="#"><span class="left"><span class="right"><span class="middle" title="' + Title + '">' + Title + '</span></span></span></a></li>');
			},
			grepo_playerlink : function (name, id) {
				return '<a class="gp_player_link" href="#' + btoa('{"name":"' + name + '","id":' + id + '}') + '">' + name + '</a>';
			},
			windowbuilder : function (name, width, height, content) {
				var winqm = Layout.wnd.Create(Layout.wnd.TYPE_QT_STANDARD, name);
				winqm.setWidth(width);
				winqm.setHeight(height);
				winqm.setContent(content);
				return winqm.getID();
			}
		},
		academyMarker : function () { //DEFEKT
			$.Observer(GameEvents.building.academy.research.buy).subscribe('QT_academy_buy', function (e, data) {
				alert("buy");
			})
			$.Observer(GameEvents.building.academy.research.cancel).subscribe('QT_academy_cancel', function (e, data) {
				alert("cancel");
			})
			var wndID = BuildingWindowFactory.getWnd().getID();
			var qacmarkDIV = '<div class="qacamark green" style="width: 100%; height: 100%; position: absolute; background: none repeat scroll 0% 0% green; top: -3px; left: -3px; border: 3px solid green; opacity: 0.4"></div>';
			
			$("DIV#gpwnd_" + wndID).append('<div id="qacacountWrapper"><div id="qacacountGreen" class="qacacountBox" style="margin-left:25px">0</div><div id="qacacountRed" class="qacacountBox" style="margin-left:70px">0</div><a id="qacamarkResearched" class="qacaBTN green" style="left:104px; background-image: url(http://s1.directupload.net/images/130904/2tny5dlh.png)" href="#"></a><a id="qacamarkNotResearched" class="qacaBTN green" style="left:124px; background-image: url(http://s7.directupload.net/images/130904/pkeasgik.png)" href="#"></a><a id="qacamarkNone" class="qacaBTN" style="left:144px; background-image: url(http://s1.directupload.net/images/130904/yothfag9.png)" href="#"></a></div>');
			
			$("#qacacountWrapper").css({
				"margin" : " 0px auto",
				"display" : "block",
				"position" : "relative",
				"height" : "35px",
				"width" : "172px",
				"background-image" : "url(http://s7.directupload.net/images/130924/wvvkhpvh.png)"
			});
			$(".qacacountBox").css({
				"margin-top" : "12px",
				"font" : "bold 11px Verdana",
				"position" : "absolute",
				"display" : "block"
			});
			$(".qacaBTN").css({
				"width" : "20px",
				"height" : "20px",
				"margin-top" : "8px",
				"position" : "absolute",
				"display" : "block"
			});
			$(".academy_info").css({
				"z-index" : "1"
			});
			
			$(".qacaBTN").hover(
				function () {
				$(this).css({
					"background-position" : "0px -21px"
				});
			},
				function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			});
			
			$('#qacamarkResearched').mousePopup(new MousePopup(QT.Lang.get("academy", "researched")));
			$('#qacamarkNotResearched').mousePopup(new MousePopup(QT.Lang.get("academy", "notresearched")));
			$('#qacamarkNone').mousePopup(new MousePopup(QT.Lang.get("academy", "undo")));
			
			function resetSelected() {
				$(".qacamark").each(function () {
					$(this).remove();
				});
				researchPoints = {
					"red" : 0,
					"green" : 0,
					"blue" : 0
				};
				researchSelected = {};
				UpdateResearchPointsText();
				$("#qacamarkResearched").removeClass().addClass("qacaBTN green").css({
					"background-image" : "url(" + qacaBTNpics.qacamarkResearched[0] + ")"
				});
				$("#qacamarkNotResearched").removeClass().addClass("qacaBTN green").css({
					"background-image" : "url(" + qacaBTNpics.qacamarkNotResearched[0] + ")"
				});
			};
			function GetResearchColorPoints() {
				researchPoints = {
					"red" : 0,
					"green" : 0,
					"blue" : 0
				};
				$(".qacamark").each(function () {
					var thisColor = $(this).attr('class').split(' ').pop();
					researchPoints[thisColor] += GameData.researches[$(this).parent().attr('id').substr(17)].research_points;
				});
			};
			function UpdateResearchPointsText() {
				$("#qacacountRed").text(researchPoints.red);
				$("#qacacountGreen").text(researchPoints.green);
				$("#qacacountBlue").text(researchPoints.blue + "/120");
			};
			function SafeResearchColor() {
				$(".qacamark").each(function () {
					var thisColor = $(this).attr('class').split(' ').pop();
					researchSelected[$(this).parent().attr('id')] = thisColor;
				});
			};
			function ChangeAllResearchColors(researchselector, color) {
				$("DIV#gpwnd_" + wndID + researchselector).each(function () {
					var thisParent = $(this).parent();
					if (!$(".qacamark", thisParent).length > 0 && color != "nocolor") {
						$(".academy_info", thisParent).after(qacmarkDIV);
					} else if (color === "nocolor") {
						$(".qacamark", thisParent).remove();
					}
					$(".qacamark", thisParent).removeClass().addClass("qacamark " + color).css({
						"background-color" : color,
						"border-color" : color
					});
				});
			};
			$(".qacaBTN").click(function () {
				var thisColor = $(this).attr('class').split(' ').pop();
				if (this.id != "qacamarkNone") {
					if (thisColor === "green") {
						$(this).removeClass("green").addClass("red").css({
							"background-image" : "url(" + qacaBTNpics[this.id][1] + ")"
						});
					} else if (thisColor === "red") {
						$(this).removeClass("red").addClass("nocolor").css({
							"background-image" : "url(" + qacaBTNpics[this.id][2] + ")"
						});
					} else if (thisColor === "nocolor") {
						$(this).removeClass("nocolor").addClass("green").css({
							"background-image" : "url(" + qacaBTNpics[this.id][0] + ")"
						});
					}
					if (this.id === "qacamarkResearched") {
						ChangeAllResearchColors(" .is_researched,.in_progress", thisColor);
					} else if (this.id === "qacamarkNotResearched") {
						ChangeAllResearchColors(" .can_be_researched,.can_not_be_researched_yet", thisColor);
					}
				} else {
					resetSelected();
				}
				GetResearchColorPoints();
				UpdateResearchPointsText();
				SafeResearchColor();
			});
			$("DIV#gpwnd_" + wndID + " .academy_info").click(function () {
				var thisParent = $(this).parent();
				if ($(".qacamark", thisParent).length > 0) {
					var $this = $(".qacamark", thisParent);
					if ($this.hasClass("green")) {
						$this.removeClass("green").addClass("red").css({
							"background-color" : "red",
							"border-color" : "red"
						});
					} else if ($this.hasClass("red")) {
						$this.remove();
					}
				} else {
					$(".academy_info", thisParent).after(qacmarkDIV);
				}
				GetResearchColorPoints();
				UpdateResearchPointsText();
				SafeResearchColor();
			});
			//init
			if (typeof researchSelected == "undefined") {
				researchSelected = {};
				researchPoints = {
					"red" : 0,
					"green" : 0,
					"blue" : 0
				};
				qacaBTNpics = {
					"qacamarkResearched" : ["http://s1.directupload.net/images/130904/2tny5dlh.png", "http://s14.directupload.net/images/130904/q3kd5re4.png", "http://s1.directupload.net/images/130904/w4juy8xf.png"],
					"qacamarkNotResearched" : ["http://s7.directupload.net/images/130904/pkeasgik.png", "http://s1.directupload.net/images/130904/qmzufy5p.png", "http://s1.directupload.net/images/130904/bt42389p.png"]
				}
			} else {
				$.each(researchSelected, function (key, value) {
					$("#" + key + " .academy_info").after(qacmarkDIV);
					$("#" + key + " .qacamark").removeClass("green").addClass(value).css({
						"background-color" : value,
						"border-color" : value
					});
				});
				UpdateResearchPointsText();
			}
		},
		addsettingsbutton : function () {
			var b = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_PLAYER_SETTINGS);
			if (!b)
				return;
			var c = $("DIV#gpwnd_" + b.getID() + " .settings-menu ul:last");
			if ($(c).find('#quack-toolsammlung').length == 0) {
				$(c[0]).append('<li><img id="quackicon" style="width:20px;height:15px;vertical-align:bottom;" src="http://s1.directupload.net/images/130206/r2q9fzri.png"></img> <a id="quack-toolsammlung" href="#">Quack Toolsammlung</a></li>');
				$("#quack-toolsammlung").click(function () {
					QT.Functions.scriptmanager();
				})
			}
		},
		allianceGSButton : function (event, xhr, settings) {
			var b = settings.url.match(/alliance_id%22%3A(\d*)%2C/);
			var c = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_ALLIANCE_PROFILE);
			if (!c)
				return;
			var d = $("DIV#gpwnd_" + c.getID() + " DIV#player_buttons ");
			$(d[0]).find(".ally_msg_leader, .ally_msg_founder").css({
				"float" : "left"
			});
			$(d[0]).append("<a target=_blank href=http://" + mID + ".grepostats.com/world/" + wID + "/alliance/" + b[1] + '><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a>')
		},
		allianceInactivity : function () {
			var wnd = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_ALLIANCE_PROFILE);
			if (!wnd)
				return;
			var wndID = wnd.getID();
			//$("DIV#gpwnd_" + wndID + " DIV#ally_towns UL.members_list > LI > UL > LI:not(.error_message):not(.sub_header):not(.header):not(:has(ul))")
			//$("DIV#gpwnd_" + wndID + " DIV#ally_towns UL.members_list UL LI:not(.error_message):not(.sub_header):not(.header):not(:has(ul))")
			$("DIV#gpwnd_" + wndID + " DIV#ally_towns UL.members_list > LI > UL > LI:not(.error_message):not(.sub_header):not(.header):not(:has(ul))").prepend(QT.Functions.Inactivity.addDisplay("margin:3px 4px 0 0;"));
			var currentTownXY = QT.Functions.Inactivity.Filter.coordinates();

			var JQelement_qt_activity = $("DIV#gpwnd_" + wndID + " DIV#ally_towns UL.members_list UL LI A.qt_activity");
			var players = [];
			JQelement_qt_activity.parent().each(function (index, element) {
				var gpElement = $(this).find(".gp_player_link");
				var qt_activityElement = $(this).find(".qt_activity");
				var href = gpElement.attr("href").split(/#/);
				var id = $.parseJSON(atob(href[1] || href[0])).id;
				if (QT.Functions.Inactivity.isCached(id)) {
					var inactive_days_cached = QT.Functions.Inactivity.cache[id];
					QT.Functions.Inactivity.changeDisplay(qt_activityElement, inactive_days_cached);
				} else {
					players.push(id);
				}
				qt_activityElement.data("id", id).prop('href', 'http://polissuche.marco93.de/' + wID + '.html?filter=player_id:' + id + currentTownXY + '');
			});

			if (!players.length > 0)
				return;

			QT.Functions.Inactivity.getData(players).done(function (data) {
				JQelement_qt_activity.each(function (index, element) {
					var dataID = $(this).data('id');
					QT.Functions.Inactivity.changeDisplay(this, QT.Functions.Inactivity.cache[dataID]);
				});
			});
		},
		bbcodeBtnTown : function () {
			$('<a id="BTN_TownBB" href="#"></a><input id="INPUT_TownBB" type="text" onfocus="this.select();" onclick="this.select();">').appendTo('.town_name_area');
			$("#BTN_TownBB").css({
				"z-index" : "5",
				"top" : "56px",
				"left" : "95px",
				"position" : "absolute",
				"height" : "16px",
				"width" : "18px",
				"background-image" : "url(http://s14.directupload.net/images/131121/eif6bq74.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px 0px"
			});
			$("#INPUT_TownBB").css({
				"z-index" : "5",
				"top" : "29px",
				"left" : "21px",
				"position" : "absolute",
				"width" : "160px",
				"display" : "none",
				"text-align" : "center"
			});
			$("#BTN_TownBB").click(function () {
				$("#INPUT_TownBB").toggle();
				$("#INPUT_TownBB").val("[town]" + Game.townId + "[/town]");
			});
			$("#BTN_TownBB").hover(
				function () {
				$(this).css({
					"background-position" : "0px -16px"
				});
			},
				function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			});
		},
		bbcodes : function (mode) {
			var GD_units = GameData.units;
			var units_own = ITowns.getTown(parseInt(Game.townId)).units();
			var units_support = ITowns.getTown(parseInt(Game.townId)).unitsSupport();
			var units_outer = ITowns.getTown(parseInt(Game.townId)).unitsOuter();
			var cities_own = ITowns.towns_collection.models;
			var active_towngroup = MM.collections.TownGroup[0].getActiveGroupId();
			var cities_towngroup = ITowns.town_group_towns.getTowns(active_towngroup);
			var bbcodeArray = [];
			var bbcodeBild = "[*]";
			var bbcodeAnzahl = "[*]";
			var bb_content = "";
			var bb_windowtitle = "";
			if (mode === "bbcode_intown") {
				$.each(units_own, function (unit, number) {
					if (units_own[unit] != 0) {
						if (units_support[unit]) {
							number += units_support[unit];
						}
						bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
						bbcodeAnzahl += "[center]" + number + "[/center][|]";
						bbcodeArray.push("" + unit + "");
					}
				});
				$.each(units_support, function (unit, number) {
					if (units_support[unit] != 0 && bbcodeArray.indexOf(unit) == -1) {
						bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
						bbcodeAnzahl += "[center]" + number + "[/center][|]";
					}
				});
				bb_content = "[b]" + QT.Lang.get("bbcode", "troops") + " " + QT.Lang.get("bbcode", "in") + " [/b][town]" + parseInt(Game.townId) + "[/town]:\n[table]" + bbcodeBild.slice(0, -3) + bbcodeAnzahl.slice(0, -3) + "[/table]";
				bb_windowtitle = QT.Lang.get("bbcode", "troops") + " " + QT.Lang.get("bbcode", "in") + " " + Game.townName;
			} else if (mode === "bbcode_fromtown") {
				$.each(units_own, function (unit, number) {
					if (units_own[unit] != 0) {
						bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
						bbcodeAnzahl += "[center]" + number + "[/center][|]";
					}
				});
				bb_content = "[b]" + QT.Lang.get("bbcode", "troops") + " " + QT.Lang.get("bbcode", "from") + " [/b][town]" + parseInt(Game.townId) + "[/town]:\n[table]" + bbcodeBild.slice(0, -3) + bbcodeAnzahl.slice(0, -3) + "[/table]";
				bb_windowtitle = QT.Lang.get("bbcode", "troops") + " " + QT.Lang.get("bbcode", "from") + " " + Game.townName;
			} else if (mode === "bbcode_outer") {
				gpAjax.ajaxPost('units_beyond_info', 'get_supporting_units_for_foreigners', {}, false, function (data) {
					$.each(data.collections[0].data, function (index, object) {
						bb_content += "[town]" + object.current_town_id + "[town]";
						$.each(object, function (unit, number) {
							if (GD_units[unit] && number != 0) {
								bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
								bbcodeAnzahl += "[center]" + number + "[/center][|]";
							}
						});
					});
					bb_content = "[b]" + QT.Lang.get("bbcode", "troops") + " " + QT.Lang.get("bbcode", "outside") + " [/b][town]" + parseInt(Game.townId) + "[/town]:\n[table]" + bbcodeBild.slice(0, -3) + bbcodeAnzahl.slice(0, -3) + "[/table]";
					bb_windowtitle = QT.Lang.get("bbcode", "troops") + " " + QT.Lang.get("bbcode", "outside") + " " + Game.townName;
				});
			} else if (mode === "bbcode_buildings") {
				var buildings_levels = ITowns.getTown(parseInt(Game.townId)).buildings();
				var q_buildings = {};
				var q_buildings_special = {
					"trade_office" : "http://s1.directupload.net/images/130426/sivub4fd.png",
					"tower" : "http://s7.directupload.net/images/130426/wjbtzr8z.png",
					"thermal" : "http://s14.directupload.net/images/130426/9hzexzo7.png",
					"theater" : "http://s1.directupload.net/images/130426/daevkl33.png",
					"statue" : "http://s7.directupload.net/images/130426/67vl4qhs.png",
					"oracle" : "http://s7.directupload.net/images/130426/7jj7uzgp.png",
					"lighthouse" : "http://s14.directupload.net/images/130426/xanhmd6w.png",
					"library" : "http://s1.directupload.net/images/130426/3yl9yvuc.png"
				}
				var find_buildings_special = "trade_office tower thermal theater statue oracle lighthouse library";
				var lv_buildings_standard = "";
				var lv_buildings_special = "";
				$.each(GameData.buildings, function (building) {
					if (find_buildings_special.indexOf(building) > -1 && buildings_levels.getBuildingLevel(building) > 0) {
						lv_buildings_standard += "[img]" + q_buildings_special[building] + "[/img]";
						lv_buildings_special += "..." + buildings_levels.getBuildingLevel(building) + "...";
					}
					q_buildings[building] = ".." + buildings_levels.getBuildingLevel(building) + "...";
					if (buildings_levels.getBuildingLevel(building) < 10) {
						q_buildings[building] = "." + q_buildings[building];
					}
				});
				var lv_buildings_standard_reihenfolge =
					q_buildings.main +
					q_buildings.lumber +
					q_buildings.farm +
					q_buildings.stoner +
					q_buildings.storage +
					q_buildings.ironer +
					q_buildings.barracks +
					q_buildings.temple +
					q_buildings.market +
					q_buildings.docks +
					q_buildings.academy +
					q_buildings.wall +
					q_buildings.hide +
					lv_buildings_special;
				var q_buildings_headline = Array(lv_buildings_standard_reihenfolge.length).join("-");
				bb_content = "[quote][b]" + QT.Lang.get("bbcode", "building") + " " + QT.Lang.get("bbcode", "in") + " [/b][town]" + parseInt(Game.townId) + "[/town]:\n[font=monospace]" + q_buildings_headline + "\n[img]http://s1.directupload.net/images/130426/vif5htpa.png[/img]" + lv_buildings_standard + "[size=8]" + lv_buildings_standard_reihenfolge.slice(0, -1) + "[/size][/font][/quote]";
				bb_windowtitle = QT.Lang.get("bbcode", "building") + " " + QT.Lang.get("bbcode", "in") + " " + Game.townName;
			} else if (mode === "bbcode_cities_all") {
				bb_content = "";
				$.each(cities_own, function (key, town) {
					bb_content += "[town]" + town.id + "[/town] (" + town.attributes.points + ") " + town.attributes.island_x + "|" + town.attributes.island_y + "\n";
				});
				bb_windowtitle = QT.Lang.get("bbcode", "cities");
			} else if (mode === "bbcode_cities_grp") {
				var bb_content = "";
				$.each(cities_towngroup, function (key, town) {
					bb_content += "[town]" + town.attributes.town_id + "[/town] (" + town.town_model.attributes.points + ") " + town.town_model.attributes.island_x + "|" + town.town_model.attributes.island_y + "\n";
				});
				bb_windowtitle = QT.Lang.get("bbcode", "cities");
			}
			var expRahmen_a = "<div class='inner_box'><div class='game_border'><div class='game_border_top'></div><div class='game_border_bottom'></div><div class='game_border_left'></div><div class='game_border_right'></div><div class='game_border_corner corner1'></div><div class='game_border_corner corner2'></div><div class='game_border_corner corner3'></div><div class='game_border_corner corner4'></div><div class='game_header bold' style='height:18px;'><div style='float:left; padding-right:10px;'></div>";
			var expRahmen_b = "</div><textarea id='expTextarea' style=\"height: 228px; width: 685px;\">";
			var expRahmen_c = "</textarea></div><div style='overflow-x: hidden; padding-left: 5px; position: relative;'></div></div></div>";
			var expTitel = "Copy & Paste";
			var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_BBCODE) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_BBCODE);
			wnd.setTitle(QT.Lang.get("qtoolbox", "bb_codes") + " - " + bb_windowtitle);
			wnd.setContent(expRahmen_a + expTitel + expRahmen_b + bb_content + expRahmen_c);
			$("#expTextarea").focus(function () {
				var that = this;
				setTimeout(function () {
					$(that).select();
				}, 10);
			});
		},
		city_view_btn : function () {
			$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=messages]').removeClass("first");
			$('#ui_box .nui_main_menu .middle .content ul').not("ul li ul").prepend('<li data-option-id="cityview" class="messages main_menu_item first"><span class="content_wrapper"><span class="button_wrapper" style="opacity: 1;"><span class="button"><span class="icon" style="background:url(http://s14.directupload.net/images/140424/vbvnndai.png)"></span><span class="indicator" style="display: none;">0</span></span></span><span class="name_wrapper" style="opacity: 1;"><span class="name">' + QT.Lang.get("grepo_mainmenu", "city_view") + '</span></span></span></li>');
			$('#ui_box .nui_main_menu .middle .content ul').not("ul li ul").css({
				"height" : "+=34px"
			});

			function QT_island_overview() {
				$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=cityview] .icon').css({
					"background" : "url(http://s14.directupload.net/images/140501/rwe2n26g.png) no-repeat",
					"top" : "8px",
					"left" : "5px"
				});
				$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=cityview] .name').text(QT.Lang.get("grepo_mainmenu", "island_view"));
			}
			function QT_city_overview() {
				$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=cityview] .icon').css({
					"background" : "url(http://s14.directupload.net/images/140424/vbvnndai.png) no-repeat",
					"top" : "6px",
					"left" : "6px"
				});
				$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=cityview] .name').text(QT.Lang.get("grepo_mainmenu", "city_view"));
			}

			$.Observer(GameEvents.ui.bull_eye.radiobutton.city_overview.click).subscribe('QT_city_overview', function (e, data) {
				QT_island_overview();
			});

			$.Observer(GameEvents.ui.bull_eye.radiobutton.island_view.click).subscribe('QT_island_view', function (e, data) {
				QT_city_overview();
			});

			$.Observer(GameEvents.ui.bull_eye.radiobutton.strategic_map.click).subscribe('QT_strategic_map', function (e, data) {
				QT_city_overview();
			});

			$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=cityview]').click(function () {
				if (!$("#ui_box .bull_eye_buttons .city_overview").hasClass('checked')) {
					$("#ui_box .bull_eye_buttons .city_overview").click();
				} else {
					$("#ui_box .bull_eye_buttons .island_view").click();
				}
			});
		},
		city_view_window : function () {
			$.Observer(GameEvents.ui.bull_eye.radiobutton.city_overview.click).subscribe('QT_city_overview_window', function (e, data) {
				var city_wnd = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_QT_TOWNOVERVIEW);
				if (city_wnd) {
					city_wnd.setTitle(QT.Lang.get("grepo_mainmenu", "city_view") + " - " + Game.townName);
					return;
				}
				var html = '<div id="QT_townoverview"></div>';
				var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_TOWNOVERVIEW) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_TOWNOVERVIEW);
				wnd.setContent(html);
				wnd.setTitle(QT.Lang.get("grepo_mainmenu", "city_view") + " - " + Game.townName);
				var JQel = wnd.getJQElement();
				
				JQel.find(".gpwindow_content").css({
					"overflow" : "hidden",
					"border" : "1px solid black"
				});
				
				JQel.find('#QT_townoverview').append($('DIV.ui_city_overview')).append($('DIV.ui_construction_queue'));
				
				$('DIV.ui_construction_queue').css({
					"bottom":"-3px"
				});
				$('DIV.ui_city_overview .town_background').css({
					"left" : "-566px",
					"top" : "-316px"
				});
			});
			
			$("#ui_box .bull_eye_buttons .rb_map").on("rb:change:value", function (e, value, old_value) {
				if (value === 'island_view' || value === 'strategic_map') {
					var wnd = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_QT_TOWNOVERVIEW);
					if (!wnd)
						return;
					wnd.close();
				}
			});
		},
		city_view_windowTitle : function () {
			var wnd = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_QT_TOWNOVERVIEW);
			if (wnd)
				wnd.setTitle(QT.Lang.get("grepo_mainmenu", "city_view") + " - " + Game.townName);
		},
		commandOverview : function (a, b, c) {
			var d = b.responseText.match(/{(.+)}/);
			var e = $.parseJSON("{" + d[1] + "}");
			if (e.json.data != undefined) {
				if (e.json.data.total_commands.length > 0)
					$("#place_defense .game_border .game_header").html($("#place_defense .game_border .game_header").html().split(" (")[0] + " (" + e.json.data.total_commands + ")");
				var f = {
					attack_land : 0,
					support : 0,
					attack_sea : 0,
					attack_spy : 0,
					farm_attack : 0,
					abort : 0,
					attack_takeover : 0
				};
				for (var g = 0; g < e.json.data.total_commands.length; g++)
					f[e.json.data.commands[g].type]++;
				var h = $("div .support_filter");
				$(h[0]).mousePopup(new MousePopup("Befehle: " + f.attack_land));
				$(h[1]).mousePopup(new MousePopup("Befehle: " + f.support));
				$(h[2]).mousePopup(new MousePopup("Befehle: " + f.attack_sea));
				$(h[3]).mousePopup(new MousePopup("Befehle: " + f.attack_spy));
				$(h[4]).mousePopup(new MousePopup("Befehle: " + f.farm_attack));
				$(h[5]).mousePopup(new MousePopup("Befehle: " + f.abort));
				$(h[6]).mousePopup(new MousePopup("Befehle: " + f.attack_takeover))
			}
		},
		cultureOverview : function () {
			var a = $("ul#cultur_overview_towns");
			var b,
			c,
			d,
			e;

			e = 0;
			b = $('a[class~="confirm"][class~="type_triumph"]');
			d = $('a[class~="confirm"][class~="type_triumph"][class~="disabled"]');
			if (d.length > 0) {
				for (var f = 0; f < b.length; f++) {
					if ($(b[f]).attr("class").indexOf("disabled") > 1)
						continue;
					c = $(b[f]).parents('li[id^="ov_town_"]');
					eltext = c[0].previousSibling;
					$(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));
					$(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))
				}
			}

			e = 0;
			b = $('a[class~="confirm"][class~="type_theater"]');
			d = $('a[class~="confirm"][class~="type_theater"][class~="disabled"]');
			if (d.length > 0) {
				for (var f = 0; f < b.length; f++) {
					if ($(b[f]).attr("class").indexOf("disabled") > 1)
						continue;
					c = $(b[f]).parents('li[id^="ov_town_"]');
					eltext = c[0].previousSibling;
					$(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));
					$(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))
				}
			}

			e = 0;
			b = $('a[class~="confirm"][class~="type_party"]');
			d = $('a[class~="confirm"][class~="type_party"][class~="disabled"]');
			if (d.length > 0) {
				for (var f = 0; f < b.length; f++) {
					if ($(b[f]).attr("class").indexOf("disabled") > 1)
						continue;
					c = $(b[f]).parents('li[id^="ov_town_"]');
					eltext = c[0].previousSibling;
					$(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));
					$(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))
				}
			}

			var g = $("ul#culture_overview_towns span.eta");
			var h = $("#culture_points_overview_bottom #place_culture_count").text();
			if (h.indexOf("[") < 1) {
				var i = h.split("/");
				var j = parseInt(i[0]) + g.length;
				var k = parseInt(i[1]) - j;
				if (k > 0) {
					$("#culture_points_overview_bottom #place_culture_count").append("<span id='qculture'>[-" + k + "]</span>");
				} else {
					var l = new Array;
					for (var f = 0; f < g.length; f++)
						l.push($(g[f]).text());
					l.sort();
					var m = l[l.length + k - 1];
					$("#culture_points_overview_bottom #place_culture_count").append(" [<span id='qculture'></span>]<span id='qcultureplus' style='color: #ECB44D'> +" + k * -1 + "</span>").find("span#qculture").countdown(m);
				}
			} else {
				var i = h.split("/");
				var j = parseInt(i[0]) + g.length;
				var k = parseInt(i[1]) - j;
				if (k > 0) {
					$("#qculture").text("[-" + k + "]");
				} else {
					CultureOverview.wnd.reloadContent();
				}
			}

			if ($('#qcultureBTN_wrapper').length == 0) {
				$("#culture_overview_wrapper").parent().append('<div id="qcultureBTN_wrapper"><div class="qcultureBTN_wrapper_right"><div id="qcultureBTN_theather_r" class="qcultureBTN_r qcultureBTN_theather"></div><div id="qcultureBTN_triumph_r" class="qcultureBTN_r qcultureBTN_triumph"></div><div id="qcultureBTN_olympicgames_r" class="qcultureBTN_r qcultureBTN_olympicgames"></div><div id="qcultureBTN_cityfestival_r" class="qcultureBTN_r qcultureBTN_cityfestival"></div></div></div>');
				//<div class="qcultureBTN_wrapper_left"><div id="qcultureBTN_theather_l" class="qcultureBTN_l qcultureBTN_theather"></div><div id="qcultureBTN_triumph_l" class="qcultureBTN_l qcultureBTN_triumph"></div><div id="qcultureBTN_olympicgames_l" class="qcultureBTN_l qcultureBTN_olympicgames"></div><div id="qcultureBTN_cityfestival_l" class="qcultureBTN_l qcultureBTN_cityfestival"></div></div>
				$("#culture_overview_wrapper").css({
					"top" : "35px",
					"height" : "370px"
				});
				$("#qcultureBTN_wrapper").css({

					"color" : "white",
					"font-family" : "Verdana",
					"font-weight" : "bold",
					"font-size" : "12px",
					"text-align" : "center",
					"line-height" : "25px",
					"text-shadow" : "1px 1px 0 #000000"
				});
				$(".qcultureBTN_wrapper_left").css({
					"position" : "absolute",
					"top" : "0px",
					"left" : "0px",
					"margin-left" : "7px"
				});
				$(".qcultureBTN_wrapper_right").css({
					"position" : "absolute",
					"top" : "0px",
					"right" : "0px"
				});
				$(".qcultureBTN_l, .qcultureBTN_r").css({
					"cursor" : "pointer",
					"width" : "25px",
					"height" : "25px",
					"float" : "right",
					"position" : "relative",
					"margin-left" : "3px",
					"border" : "2px groove gray",
					"background" : "url(http://s7.directupload.net/images/140221/lztu5tha.png)"
				});
				$(".qcultureBTN_cityfestival").css({
					"background-position" : "0 -100px"
				});
				$(".qcultureBTN_olympicgames").css({
					"background-position" : "0 -25px"
				});
				$(".qcultureBTN_triumph").css({
					"background-position" : "0 -75px"
				});
				$(".qcultureBTN_theather").css({
					"background-position" : "0 -50px"
				});
				var qcultureBTN_r_clicked_last = "";
				function hideTownElements(JQelement) {
					var qcultureBTN_mode = "";
					switch (JQelement.id) {
					case "qcultureBTN_cityfestival_r":
						qcultureBTN_mode = "ul li:eq(0)";
						break;
					case "qcultureBTN_olympicgames_r":
						qcultureBTN_mode = "ul li:eq(1)";
						break;
					case "qcultureBTN_triumph_r":
						qcultureBTN_mode = "ul li:eq(2)";
						break;
					case "qcultureBTN_theather_r":
						qcultureBTN_mode = "ul li:eq(3)";
						break;
					default:
						HumanMessage.error("Error");
						break;
					}
					if (qcultureBTN_r_clicked_last === JQelement.id) {
						$("ul#culture_overview_towns li").filter(function () {
							return !!$(qcultureBTN_mode, this).find('.eta').length;
						}).toggle();
						$(JQelement).toggleClass("culture_red");
					} else {
						$("ul#culture_overview_towns li").show().filter(function () {
							return !!$(qcultureBTN_mode, this).find('.eta').length;
						}).hide();
						$(".qcultureBTN_r").removeClass("culture_red");
						$(JQelement).addClass("culture_red");
					}
					qcultureBTN_r_clicked_last = JQelement.id;
					$(".qcultureBTN_r").css({
						border : "2px groove #808080"
					});
					$(".culture_red").css({
						border : "2px groove #CC0000"
					});
				}
				$(".qcultureBTN_r").click(function () {
					hideTownElements(this);
				});
				/*
				function hideCelebrationElements (JQelement) {
				$(".qcultureBTN_r").css({border: "2px groove #808080"});
				$(".culture_red").css({border: "2px groove #CC0000"});
				$("ul#culture_overview_towns li ul.celebration_wrapper li:nth-child(2)").hide();
				$("ul#culture_overview_towns li ul.celebration_wrapper li:nth-child(4)").hide();
				}
				$(".qcultureBTN_l").click(function () {
				hideCelebrationElements(this);
				});*/
			}

			var qcultureCounter = {
				cityfestivals : 0,
				olympicgames : 0,
				triumph : 0,
				theather : 0
			};

			var qbashpoints = $("#culture_points_overview_bottom .points_count").text().split("/");
			var qgoldforgames = Math.floor($("#ui_box .gold_amount").text() / 50);
			qcultureCounter.triumph = Math.floor((parseInt(qbashpoints[0]) - parseInt(qbashpoints[1])) / 300) + 1;
			if (qcultureCounter.triumph < 0) {
				qcultureCounter.triumph = 0;
			}
			qcultureCounter.cityfestivals = $('a[class~="confirm"][class~="type_party"]:not(.disabled)').length;
			qcultureCounter.olympicgames = $('a[class~="confirm"][class~="type_games"]:not(.disabled)').length;
			if (qgoldforgames < qcultureCounter.olympicgames) {
				qcultureCounter.olympicgames = qgoldforgames;
			}
			qcultureCounter.theather = $('a[class~="confirm"][class~="type_theater"]:not(.disabled)').length;

			$("#qcultureBTN_cityfestival_r").text(qcultureCounter.cityfestivals);
			$("#qcultureBTN_olympicgames_r").text(qcultureCounter.olympicgames);
			$("#qcultureBTN_triumph_r").text(qcultureCounter.triumph);
			$("#qcultureBTN_theather_r").text(qcultureCounter.theather);
			$(".qcultureBTN_cityfestival").mousePopup(new MousePopup(QT.Lang.get("culture", "cityfestivals")));
			$(".qcultureBTN_olympicgames").mousePopup(new MousePopup(QT.Lang.get("culture", "olympicgames")));
			$(".qcultureBTN_triumph").mousePopup(new MousePopup(QT.Lang.get("culture", "triumph")));
			$(".qcultureBTN_theather").mousePopup(new MousePopup(QT.Lang.get("culture", "theater")));
			//$("ul#culture_overview_towns li ul.celebration_wrapper li:nth-child(2)").hide();

		},
		farmingvillageshelper : {
			rememberloot : function () {
				var activeFarmClass = $('#time_options_wrapper .active').attr('class').split(' ');
				activeFarm = activeFarmClass[1];
			},
			setloot : function () {
				setTimeout(function () {
					$('#time_options_wrapper .' + activeFarm).click();
				}, 500);
			},
			islandHeader : function () {
				$('#fto_town_list li').each(function( index ) {
					if (this.classList.length == 2) {
						$(this).addClass("q_li_island");
						$(this).append(
						'<div class="qcolordivider" style="background-image: url(http://s14.directupload.net/images/140805/wqknyseg.png); display: block; height: 24px; margin: -4px -2px;"></div>' +
						'<div class="checkbox_new checked disabled" style="position: absolute; right: 2px; top: 5px"><div class="cbx_icon"></div></div>'
						);
						$(this).find("span").css({
							"margin-left" : "2px"
						});
						$(this).find("a").css({
							"color" : "rgb(238, 221, 187)"
						});
					}
				});
				$('.qcolordivider').click(function () {
					var el = $(this).parent().nextUntil(".q_li_island");
					if ($('#fto_town_list li:first[style*="border-right"]').length == 0) {
						el.slideToggle();
					} else {
						el.toggleClass("hidden");
					}
				});
				$("#fto_town_wrapper .game_header").append('<a href="#" id="q_toggleAutohide" style="top: 6px; right: 5px; position: absolute; height: 11px; width: 17px; background-image: url(http://s14.directupload.net/images/140807/bydwxdus.png)"></a>');
				if (!QT.Settings.values.qmenu_settings_farmhelper_hidecities) {
					$("#q_toggleAutohide").addClass('q_autoHideCitiesOff');
				}
				
				$("#q_toggleAutohide").click(function () {
					if (QT.Settings.values.qmenu_settings_farmhelper_hidecities) {
						QT.Settings.save("qmenu_settings_farmhelper_hidecities", false);
					} else {
						QT.Settings.delete("qmenu_settings_farmhelper_hidecities");
					}
					QT.Settings.values.qmenu_settings_farmhelper_hidecities = !QT.Settings.values.qmenu_settings_farmhelper_hidecities;
					$(this).toggleClass('q_autoHideCitiesOff');
				});
				$('<style type="text/css">#fto_town_list li.active {background: rgba(208, 190, 151, 0.60)} .q_autoHideCitiesOff {background-position: 0px -11px}</style>').appendTo('head');
			},
			indicateLoot : function () {
				var activeIsland = $('#fto_town_list li.active').prevAll(".q_li_island").first();
				activeIsland.find("div.checkbox_new").removeClass("disabled");
				if (QT.Settings.values.qmenu_settings_farmhelper_hidecities) {
					activeIsland.find("div.qcolordivider").trigger( "click" );
				}
			},
			switchTown : function (direction) {
				var el;
				if (direction === "up") {
					el = $('#fto_town_list li.active').prevAll("li:not(.q_li_island):visible").first();
				} else {
					el = $('#fto_town_list li.active').nextAll("li:not(.q_li_island):visible").first();
				}
				el.click();
				if (el.get(0)) {
					el.get(0).scrollIntoView();
					var scrollPosition = el.get(0).parentNode.scrollTop;
					var scrollMax = scrollPosition += 405;
					var scrollContainer = el.get(0).parentNode.scrollHeight;
					if (scrollMax != scrollContainer) {
						el.get(0).parentNode.scrollTop -= 160;
					}
				}
			}
		},
		filter : function (playerID) {
			var tester = [297128, 1764472, 432065, 880414, 7809196, 927818, 879988, 265587, 600297, 270260, 603597, 32034, 304581, 1472815, 728273, 1039235, 1550585, 366741, 8271245];
			if (tester.indexOf(playerID) < 0)
				return true;
		},
		fix_Zindex : function () {
			var index_highest = parseInt($("#town_groups_list").css("z-index"), 10);
			$(".ui-dialog").each(function () {
				var index_current = parseInt($(this).css("z-index"), 10);
				if (index_current > index_highest) {
					index_highest += index_current;
				}
			});
			$("#town_groups_list").css({
				"z-index" : index_highest
			})
		},
		forumDeleteMultiple : function () {
			if ($('#forum #postlist').length) {
				if (!$('.qdeletecheckbox').length) {
					$("div.post_functions").each(function( index ) {
						if ($(this).find('a').length > 2) {
							$(this).append('<input class="qdeletecheckbox" type="checkbox">');
						}
					});
				}
				if (!$('#qdeleteAllcheckbox').length && $('.qdeletecheckbox').length) {
					if ($('div.forum_footer').length) {
						$("div.forum_footer").append('<input id="qdeleteAllcheckbox" type="checkbox"  style="margin-right: -7px; margin-left: 25px">');
					} else {
						$("div.game_list_footer").append('<input id="qdeleteAllcheckbox" type="checkbox"  style="position: absolute; right: 6px;">');
					}
				}
				if (!$('#qdeletemultipleBTN').length && $('.qdeletecheckbox').length) {
					$('#forum_buttons').append('<a id="qdeletemultipleBTN" class="q_delete" href="#"></a>');
					$(".q_delete").css({
						"margin-top" : "2px",
						"margin-left" : "2px",
						"position" : "absolute",
						"height" : "23px",
						"width" : "22px",
						"background-image" : "url(http://s14.directupload.net/images/130725/sz66nazr.png)",
						"background-repeat" : "no-repeat",
						"background-position" : "0px 0px"
					});
					$(".q_delete").hover(
						function () {
						$(this).css({
							"background-position" : "0px -23px"
						});
					},
						function () {
						$(this).css({
							"background-position" : "0px 0px"
						});
					});
				}
				
				function AreAnyCheckboxesChecked() {
					var checkboxes = $("#forum #postlist :checkbox");
					var checkboxesChecked = 0;
					for (var i = 0; i < checkboxes.length; i++) {
						if (checkboxes[i].checked) {
							checkboxesChecked++
						}
					}
					return checkboxesChecked;
				}
				
				$('#qdeletemultipleBTN').click(function () {
					var numberChecked = AreAnyCheckboxesChecked();
					if (numberChecked > 0) {
						var deleteconfirmText = "<img style='position: absolute; top:5px;' src='http://s1.directupload.net/images/130724/d7ce2sy6.png'><span style='position: absolute; color: #141414; font: 21px TrajanPro; display: inline; letter-spacing: -5px; margin: -14px auto; padding-left: 0px; width: 22px;'><b>" + numberChecked + "</b></span><br/>" + QT.Lang.get("forum", "delete_sure") + "";
						hOpenWindow.showConfirmDialog('', deleteconfirmText, function () {
							$("#forum #postlist :checkbox:checked").each(function (i) {
								var self = this
									setTimeout(function () {
										var deleteonlick = $(self).parent().find("a:last").attr("onclick").slice(17, -1).split(",");
										Forum.deletePost(deleteonlick[0], deleteonlick[1], true, deleteonlick[3]);
									}, i * 500);
							});
						});
					} else {
						HumanMessage.error(QT.Lang.get("forum", "no_selection"));
					}
				});
				
				$('#qdeleteAllcheckbox').click(function () {
					$('#forum input[type="checkbox"]').prop('checked', this.checked)
				});
				
				$("#forum #postlist :checkbox").click(function () {
					if ($('#qdeleteAllcheckbox').is(":checked")) {
						$('#qdeleteAllcheckbox').prop('checked', false);
					} else if ($('#forum #postlist input[type="checkbox"]').not(":checked").length === 0) {
						$('#qdeleteAllcheckbox').prop('checked', true);
					}
				});
			}
		},
		forumMaximize : function () {
			var qmenu_forum_finder = $(".forum_content").parent().parent().parent();
			if (qmenu_forum_finder.find(".menu_inner").width() != 5000 && qmenu_forum_finder.find(".menu_inner").width() > 650) {
				var forumWidth = qmenu_forum_finder.find(".menu_inner").width();
				qmenu_forum_finder.css({
					"margin-left" : 0 - (forumWidth - 810) / 2 - 85,
					"width" : forumWidth + 170
				});
				qmenu_forum_finder.find(".menu_inner").css({
					"position" : "static"
				});
				qmenu_forum_finder.find(".next").remove();
				qmenu_forum_finder.find(".prev").remove();
			}
			qmenu_forum_finder.find("#wrapper").css({
				"width" : "780px",
				"margin" : "0 auto"
			});
		},
		fullscreenmode : function () {
			$(".nui_toolbar, .nui_left_box, .nui_main_menu, .nui_right_box, .ui_resources_bar, .nui_units_box, .picomap_area, .gods_area, .toolbar_buttons, .tb_activities, .ui_quickbar, .town_name_area, .leaves, .minimized_windows_area, .btn_close_all_windows, #notification_area, #tutorial_quest_container, #island_quests_overview, #bug_reports_link, #BTN_HK").css('visibility', 'hidden');
			$('<div id="vb_back" style="position:absolute;cursor:pointer;z-index:1;top:1px;left:50%;border:1px solid #FFCC66;background-color:#2D5487"><img src=http://s14.directupload.net/images/120327/4tnvbg37.png></img></div>').appendTo("body");
			$("#vb_back").click(function () {
				$(".nui_toolbar, .nui_left_box, .nui_main_menu, .nui_right_box, .ui_resources_bar, .nui_units_box, .picomap_area, .gods_area, .toolbar_buttons, .tb_activities, .ui_quickbar, .town_name_area, .leaves, .minimized_windows_area, .btn_close_all_windows, #notification_area, #tutorial_quest_container, #island_quests_overview, #bug_reports_link, #BTN_HK").css('visibility', 'visible');
				$("#vb_back").remove();
			});
		},
		grepopoints : function (event, xhr, settings) {
			var a = GPWindowMgr.getOpen(Layout.wnd.TYPE_BUILDING);
			if (a.length == 0)
				return;
			var wnd = a[a.length - 1];
			var wndID = wnd.getID();
			if ($("DIV#gpwnd_" + wndID).find("span.tilx_points").length > 0 || $("DIV#gpwnd_" + wndID).find("span.tilx_points_block").length > 0)
				return;
			var buildings_array = GameData.buildings;
			var calculatePoints = function (level, val) {
				points_base = val.points;
				points_factor = val.points_factor
					points = Math.round(val.points * (Math.pow(val.points_factor, level)));
				return points;
			};
			var examineQueue = function (name, level, val) {
				$("DIV#gpwnd_" + wndID + " .building_icon40x40").each(function () {
					if ($(this).hasClass(name)) {
						if (val.max_level == 1) {
							points = "500";
							if ($(this).children("img").length > 0)
								points = "-500";
						} else if ($(".tear_down", this).length > 0) {
							points_old = calculatePoints(level, val);
							--level;
							points_new = calculatePoints(level, val);
							if (level === 0) {
								points = "-" + val.points;
							} else {
								points = points_new - points_old;
							}
						} else {
							points_old = calculatePoints(level, val);
							++level;
							points_new = calculatePoints(level, val);
							if (level === 1) {
								points = val.points;
							} else {
								points = points_new - points_old;
							}
						}
						$(this).append('<span class="tilx_points_block">' + (points !== undefined ? points : '?') + ' P<\/span>');
					}
				});
				return level;
			};
			$.each(buildings_array, function (key, val) {
				var b = $("DIV#gpwnd_" + wndID + " #building_main_" + key);
				if (b.length > 0) {
					level = parseInt($('.level', b).eq(0).text(), 10);
					factor = val.points_factor;
					if (!isNaN(level)) {
						level = examineQueue(key, level, val);
						points_old = calculatePoints(level, val);
						if (level === 0) {
							$('.build:not(.tear_down), .build_grey:not(.tear_down)', b).append('<span class="tilx_points"> (' + (val.points !== undefined ? val.points : '?') + ' P)<\/span>');
						} else if (level < val.max_level && level > 0) {
							points_new = calculatePoints(level + 1, val);
							points = points_new - points_old;
							$('.build:not(.tear_down), .build_grey:not(.tear_down)', b).append('<span class="tilx_points"> (' + (points !== undefined ? points : '?') + ' P)<\/span>');
						}
						if (level - 1 >= 0) {
							points_new = calculatePoints(level - 1, val);
							points = points_new - points_old;
							if (val.max_level === 1) {
								points = 500;
							} else if (level === 1) {
								points = val.points;
							}
							$('.tear_down', b).append('<span class="tilx_points"> (-' + (points !== undefined ? points : '?') + ' P)<\/span>');
						}
					}
				} else {
					var c = $("DIV#gpwnd_" + wndID + " #special_building_" + key).not(".special_tear_down");
					if (c.length > 0) {
						level = examineQueue(key, 0, val);
						if (level === 0) {
							c.append('<span class="tilx_points_block">' + (val.points !== undefined ? val.points : '?') + ' P<\/span>');
						}
						if ($("DIV#gpwnd_" + wndID + " #special_building_" + key + ".special_tear_down").css('backgroundImage').replace(/.*\/([^.]+)\.png.*/, '$1') === key) {
							$('#special_building_' + key + '.special_tear_down').append('<span class="tilx_points_block"> -' + (points !== undefined ? '500' : '?') + ' P<\/span>');
						}
					}
				}
			});
			$("span.tilx_points").css({
				"font-size" : "7px",
				"position" : "relative",
				"bottom" : "1px"
			});
			$("span.tilx_points_block").css({
				"display" : "block",
				"position" : "absolute",
				"top" : "-2px",
				"width" : "100%",
				"z-index" : "5",
				"color" : "#fff",
				"text-shadow" : "1px 1px 0px #000",
				"font-size" : "9px",
				"font-weight" : "bold",
				"background-color" : "rgba(0, 0, 0, 0.4)",
				"text-align" : "center"
			});
		},
		googledocs : function () {
			var html = $('<iframe />', {
					id : "googledocs_frame",
					src : "",
					style : "width:850px;height:506px;border:1px solid black;"
				});
			var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_GOOGLEDOCS) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_GOOGLEDOCS);
			wnd.setTitle("Google Docs");
			wnd.setContent(html);
			QT.Functions.helper.grepo_input("margin-left:-5px;margin-top:3px;float:left", "googledocsURL_CHANGE_TEXTFELD", QT.Settings.values.googledocsurl).insertAfter('#googledocs_frame');
			QT.Functions.helper.grepo_btn("googledocsURL_RESET_BUTTON", QT.Lang.get("googledocs", "reset")).insertAfter('#googledocs_frame');
			QT.Functions.helper.grepo_btn("googledocsURL_CHANGE_BUTTON", QT.Lang.get("googledocs", "change_url")).insertAfter('#googledocs_frame');
			$("#googledocsURL_CHANGE_TEXTFELD").css({
				"width" : "580px"
			});
			$("#googledocsURL_CHANGE_BUTTON").css({
				"margin-right" : "0px",
				"margin-top" : "3px",
				"float" : "right"
			}).click(function () {
				QT.Settings.values.googledocsurl = $("#googledocsURL_CHANGE_TEXTFELD").val();
				setTimeout(function () {
					QT.Settings.save("googledocsurl", QT.Settings.values.googledocsurl);
				}, 0);
				document.getElementById('googledocs_frame').src = QT.Settings.values.googledocsurl;
			});
			$("#googledocsURL_RESET_BUTTON").css({
				"margin-top" : "3px",
				"float" : "right"
			}).click(function () {
				QT.Settings.values.googledocsurl = "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dEF3bWs3SW5iWjdyUEE0M0c3Znpmc3c";
				QT.Settings.delete("googledocsurl");
				document.getElementById('googledocs_frame').src = QT.Settings.values.googledocsurl;
				document.getElementById('googledocsURL_CHANGE_TEXTFELD').value = QT.Settings.values.googledocsurl;
			});
			document.getElementById('googledocs_frame').src = QT.Settings.values.googledocsurl;
		},
		hidesIndexIron : function () {
			if ($('#hide_espionage').length == 0)
				return;
			var b = ITowns.getTown(parseInt(Game.townId)).getCurrentResources().iron;
			if (b > 15e3) {
				$("#hide_espionage :input").val(b - 15e3);
				setTimeout(function () {
					$("#hide_espionage :input").select().blur();
				}, 10);
			} else {
				$("#hide_espionage :input").val("");
				setTimeout(function () {
					$("#hide_espionage :input").select().blur();
				}, 10);
			}
		},
		hidesIndexAddPoints : function () { //DEFEKT
			function addPoints(nStr) {
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + '.' + '$2');
				}
				return x1 + x2;
			}
			var hideSilver = $(".hide_storage_level").text();
			$(".hide_storage_level").text(addPoints(hideSilver));
		},
		hidesSort : function () {
			$("#hides_overview_wrapper").parent().parent().append('<div id="hides_sort_control" class="overview_search_bar" style="width:741px;margin-left:6px"><span class="grepo_input" style="margin:2px"><span class="left"><span class="right"><select name="qsort_towns" id="qsort_towns" type="text"><option value="ironinstore">' + QT.Lang.get("caves", "stored_silver") + '</option><option value="name">' + QT.Lang.get("caves", "name") + '</option><option value="wood">' + QT.Lang.get("caves", "wood") + '</option><option value="stone">' + QT.Lang.get("caves", "stone") + '</option><option value="iron">' + QT.Lang.get("caves", "silver") + '</option></select></span></span></span><div id="qsortinit" class="button_order_by active" style="margin: 3px 0 0 3px"></div></div>');
			QT.Functions.helper.grepo_input("margin-top:0px","qsortfilterbox","").appendTo('#hides_sort_control');
			$('#hides_overview_towns').css({
				"margin-top" : "39px"
			});

			var selection,
			order;
			$("#qsortinit").click(function () {
				sort($("#qsort_towns").val());
				$(this).toggleClass('active')
			});

			function isNumber(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}
			
			function setfilter(selection) {
				$('#hides_overview_towns>li').show();
				if (isNumber($('#qsortfilterbox').val())) {
					regexpRES = RegExp(/wood|stone|iron/);
					regexpInS = RegExp(/eta/);
					regexpNoT = RegExp(/gp_town_link/);
					numericfilter = parseInt($('#qsortfilterbox').val());
					$('#hides_overview_towns>li').each(function (i, e) {
						if (regexpRES.test(selection)) {
							selectedSort = parseInt($(e).find(selection).text()) || 0;
						} else if (regexpInS.test(selection)) {
							selectedSort = parseInt($(e).find(selection).text().substr(1)) || 0;
						} else {
							selectedSort = $(e).find(selection).text();
							if (!(selectedSort.indexOf(numericfilter) >= 0)) {
								$(e).hide();
							}
						}
						
						if (numericfilter > selectedSort) {
							$(e).hide();
						}
					});
				} else {
					namefilter = $('#qsortfilterbox').val();
					$('#hides_overview_towns>li').each(function (i, e) {
						townname = $(e).find('a.gp_town_link').text();
						if (namefilter.length > 0 && !(townname.indexOf(namefilter) >= 0)) {
							$(e).hide();
						}
					});
				}
			};
			
			function sort(selection) {
				order = !order;
				switch (selection) {
				case "ironinstore":
					selection = 'span.eta';
					break;
				case "name":
					selection = 'a.gp_town_link';
					break;
				case "wood":
					selection = 'span.wood span.count';
					break;
				case "stone":
					selection = 'span.stone span.count';
					break;
				case "iron":
					selection = 'span.iron span.count';
					break;
				}
				setfilter(selection);
				var qArrayUnsorted = $('#hides_overview_towns>li').get();
				qArrayUnsorted.sort(function (a, b) {
					regexpRES = RegExp(/wood|stone|iron/);
					regexpInS = RegExp(/eta/);
					if (regexpRES.test(selection)) {
						a = parseInt($(a).find(selection).text()) || 0;
						b = parseInt($(b).find(selection).text()) || 0;
					} else if (regexpInS.test(selection)) {
						a = parseInt($(a).find(selection).text().substr(1)) || 0;
						b = parseInt($(b).find(selection).text().substr(1)) || 0;
					} else {
						a = $(a).find(selection).text().toLowerCase();
						b = $(b).find(selection).text().toLowerCase();
						if (order) {
							return a.localeCompare(b);
						} else {
							return b.localeCompare(a);
						}
					}
					if (order) {
						return b - a
					} else {
						return a - b
					}
				});
				for (var i = 0; i < qArrayUnsorted.length; i++) {
					qArrayUnsorted[i].parentNode.appendChild(qArrayUnsorted[i]);
				}
			}
		},
		hidesoverviewiron : function () {
			var b = $("#hides_overview_towns");
			var c = b.find(".town_item");
			for (var d = 0; d < c.length; d++) {
				var e = $(c[d]);
				var f = e.find(".iron");
				var g = Number(f.text().trim());
				var h = e.find("input");
				if (null != h.val() && g > 15e3) {
					h.val(g - 15e3).change();
					e.find(".iron_img").click();
					var i = HidesOverview.spinners[e.find(".iron_img").attr("name")];
					i.setValue(g - 15e3)
				}
			}
		},
		hotkeys : function () {
			if (QT.Settings.values.qmenu_settings_hotkey_anzeige) {
				$('<a id="BTN_HK" style="z-index:6;position:absolute;top:3px;left:366px;" href="#"><img src="http://s14.directupload.net/images/131128/88q6ajaa.png" style="border-width: 0px" /></a></a>').appendTo('#ui_box');
				var mousePopupHTML = '<span style="margin-bottom:3px;display:inline-block"><b>' + QT.Lang.get("hotkeys", "hotkeys") + ':</b></span>';
				var mousePopupArray = {};
				mousePopupArray[QT.Lang.get("hotkeys", "city_select")] = [
					[QT.Images.hotkeys.city_select],
					["<span style='display:block;margin-top:-2px'>&#8592;</span>", QT.Lang.get("hotkeys", "last_city")],
					["<span style='display:block;margin-top:-2px'>&#8594;</span>", QT.Lang.get("hotkeys", "next_city")]
				];
				if (QT.Settings.values.qmenu_settings_hotkey_jump) {
					mousePopupArray[QT.Lang.get("hotkeys", "city_select")].push(['<span style="display:block;font-size:15px;margin-top:-4px">&#8629;</span>', QT.Lang.get("hotkeys", "jump_city")]);
				} else {
					mousePopupArray[QT.Lang.get("hotkeys", "city_select")].push(['<span style="display:block;font-size:9px;margin-top:2px">Sp</span>', QT.Lang.get("hotkeys", "jump_city")]);
				}
				//['<span style="display:block;font-size:15px;margin-top:-4px">'+(QT.Settings.values.qmenu_settings_hotkey_jump) ? "&#8629;","Sp" +'</span>', QT.Lang.get("hotkeys", "jump_city")]
				mousePopupArray[QT.Lang.get("hotkeys", "administrator")] = [
					[QT.Images.hotkeys.administrator],
					["1", QT.Lang.get("hotkeys", "trade_ov")],
					["2", QT.Lang.get("hotkeys", "command_ov")],
					["3", QT.Lang.get("hotkeys", "recruitment_ov")],
					["4", QT.Lang.get("hotkeys", "troop_ov")],
					["5", QT.Lang.get("hotkeys", "troops_outside")],
					["6", QT.Lang.get("hotkeys", "building_ov")],
					["7", QT.Lang.get("hotkeys", "culture_ov")],
					["8", QT.Lang.get("hotkeys", "gods_ov")],
					["9", QT.Lang.get("hotkeys", "cave_ov")],
					["0", QT.Lang.get("hotkeys", "city_groups_ov")],
					[(mID == 'de') ? "&szlig;" : "-", QT.Lang.get("hotkeys", "city_list")]
				];
				mousePopupArray[QT.Lang.get("hotkeys", "captain")] = [
					[QT.Images.hotkeys.captain],
					[(mID == 'de') ? "´" : "=", QT.Lang.get("hotkeys", "attack_planner")],
					["X", QT.Lang.get("hotkeys", "farming_villages")]
				];
				mousePopupArray[QT.Lang.get("hotkeys", "menu")] = [
					[QT.Images.hotkeys.menu],
					["S", QT.Lang.get("hotkeys", "city_view")],
					["N", QT.Lang.get("hotkeys", "messages")],
					["B", QT.Lang.get("hotkeys", "reports")],
					[(mID == 'fr') ? "Q" : "A", QT.Lang.get("hotkeys", "alliance")],
					["F", QT.Lang.get("hotkeys", "alliance_forum")],
					["E", QT.Lang.get("hotkeys", "settings")],
					["P", QT.Lang.get("hotkeys", "profile")],
					["R", QT.Lang.get("hotkeys", "ranking")],
					["M", QT.Lang.get("hotkeys", "notes")],
					["L", QT.Lang.get("hotkeys", "chat")]
				];
				if ($('.ui_heroes_overview_container').is(':visible')) {
					mousePopupArray[QT.Lang.get("hotkeys", "menu")].push(["H", QT.Lang.get("hotkeys", "council")]);
				}
				$.each(mousePopupArray, function (a, b) {
					mousePopupHTML += '<p/><span style="margin-bottom:-11px;margin-top:-8px;border-bottom:1px solid #B48F45; width:100%;display:block"><span style="display:inline-block;height:17px;width:17px;vertical-align:middle;margin-right:5px;background-image:url(' + b[0] + ')"></span><span style="display:inline-block;height:17px;vertical-align:middle">' + a + ':</span></span><br/>';
					$.each(b, function (c, d) {
						if (c === 0)
							return;
						mousePopupHTML += '<span style="display:inline-block;height:17px;width:17px;text-align:center;vertical-align:middle;margin-right:5px;background-image:url(' + QT.Images.hotkeys.key + ')"><span style="display:block;margin-top:-1px">' + d[0] + '</span></span><span style="display:inline-block;margin-bottom:1px;height:17px;vertical-align:middle">' + d[1] + '</span><br/>';
					});
				});
				$('#BTN_HK').mousePopup(new MousePopup(mousePopupHTML));
			}
			$(document).keydown(function (hk) {
				var notTheseOnes = ['textarea', 'input'];
				var target = hk.target.tagName.toLowerCase();
				//Stadt wechseln
				//if (hk.keyCode == 37 && $.inArray(target,notTheseOnes) < 0) {HelperTown.switchToPreviousTown();}
				//if (hk.keyCode == 39 && $.inArray(target,notTheseOnes) < 0) {HelperTown.switchToNextTown();}
				// Stadtsprung
				if (hk.keyCode == 13 && $.inArray(target, notTheseOnes) < 0 && QT.Settings.values.qmenu_settings_hotkey_jump) {
					WMap.mapJump({
						'id' :  + Game.townId,
						'ix' : WMap.islandPosition.x,
						'iy' : WMap.islandPosition.y
					});
				}
				if (hk.keyCode == 32 && $.inArray(target, notTheseOnes) < 0 && !QT.Settings.values.qmenu_settings_hotkey_jump) {
					WMap.mapJump({
						'id' :  + Game.townId,
						'ix' : WMap.islandPosition.x,
						'iy' : WMap.islandPosition.y
					});
				}
				// Verwalter
				if (hk.keyCode == 49 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openTradeOverview();
				}
				if (hk.keyCode == 50 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openCommandOverview();
				}
				if (hk.keyCode == 51 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openMassRecruitOverview();
				}
				if (hk.keyCode == 52 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openUnitsOverview();
				}
				if (hk.keyCode == 53 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openOuterUnitsOverview();
				}
				if (hk.keyCode == 54 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openBuildingsOverview();
				}
				if (hk.keyCode == 55 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openCultureOverview();
				}
				if (hk.keyCode == 56 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openGodsOverview();
				}
				if (hk.keyCode == 57 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openHidesOverview();
				}
				if (hk.keyCode == 48 && $.inArray(target, notTheseOnes) < 0) {
					//TownOverviewWindowFactory.openTownGroupOverview();
				}
				if (hk.keyCode == 63 && $.inArray(target, notTheseOnes) < 0 || hk.keyCode == 219 && $.inArray(target, notTheseOnes) < 0) {
					TownOverviewWindowFactory.openTownsOverview();
				}
				if (hk.keyCode == 192 && $.inArray(target, notTheseOnes) < 0 || hk.keyCode == 221 && $.inArray(target, notTheseOnes) < 0) {
					AttackPlannerWindowFactory.openAttackPlannerWindow();
				}
				if (hk.keyCode == 88 && $.inArray(target, notTheseOnes) < 0) {
					FarmTownOverviewWindowFactory.openFarmTownOverview();
				}
				// Andere
				if (hk.keyCode == 83 && $.inArray(target, notTheseOnes) < 0) {
					if (!$("#ui_box .bull_eye_buttons .city_overview").hasClass('checked')) {
						$("#ui_box .bull_eye_buttons .city_overview").click();
					} else {
						$("#ui_box .bull_eye_buttons .island_view").click();
					}
				}
				if (hk.keyCode == 82 && $.inArray(target, notTheseOnes) < 0) {
					RankingWindowFactory.openRankingWindow();
				}
				if (hk.keyCode == 66 && $.inArray(target, notTheseOnes) < 0) {
					Layout.wnd.Create(GPWindowMgr.TYPE_REPORT, ' ');
				}
				if (hk.keyCode == 78 && $.inArray(target, notTheseOnes) < 0) {
					Layout.wnd.Create(GPWindowMgr.TYPE_MESSAGE, ' ');
				}
				if (hk.keyCode == 65 && $.inArray(target, notTheseOnes) < 0) {
					Layout.wnd.Create(GPWindowMgr.TYPE_ALLIANCE);
				}
				if (hk.keyCode == 70 && $.inArray(target, notTheseOnes) < 0) {
					Layout.allianceForum.open();
				}
				if (hk.keyCode == 69 && $.inArray(target, notTheseOnes) < 0) {
					Layout.wnd.Create(GPWindowMgr.TYPE_PLAYER_SETTINGS, ' ');
				}
				if (hk.keyCode == 80 && $.inArray(target, notTheseOnes) < 0) {
					Layout.wnd.Create(GPWindowMgr.TYPE_PLAYER_PROFILE_EDIT, ' ');
				}
				if (hk.keyCode == 77 && $.inArray(target, notTheseOnes) < 0) {
					NotesWindowFactory.openNotesWindow();
				}
				if (hk.keyCode == 76 && $.inArray(target, notTheseOnes) < 0) {
					Layout.wnd.Create(GPWindowMgr.TYPE_CHAT, ' ');
				}
				if (hk.keyCode == 72 && $.inArray(target, notTheseOnes) < 0 && $('.ui_heroes_overview_container').is(':visible')) {
					HeroesWindowFactory.openHeroesWindow();
				}
				if (hk.keyCode == 38 && $(hk.target).find("ul#fto_town_list").length > 0) {
					QT.Functions.farmingvillageshelper.switchTown("up");
				}
				if (hk.keyCode == 40 && $(hk.target).find("ul#fto_town_list").length > 0) {
					QT.Functions.farmingvillageshelper.switchTown("down");
				}
				//Mit Enter Silber einlagern
				/*if (hk.keyCode == 13 && hk.target.id === "hide_order_input") {
				$("#hide_order_confirm").click();
				}*/
			});
		},
		Inactivity : {
			cache : {},
			addToCache : function (players) {
				$.extend(QT.Functions.Inactivity.cache, players);
			},
			isCached : function (ID) {
				return (ID in QT.Functions.Inactivity.cache) ? true : false;
			},
			getData : function (players) {
				var playersString = players.toString();
				var Ajax = $.ajax({
						url : "http://marco93.de/grepolis/player_inactivity.php",
						dataType : "jsonp",
						data : {
							"world" : wID,
							"players" : playersString
						}
					}).done(function (data) {
						QT.Functions.Inactivity.addToCache(QT.Functions.Inactivity.calcDays(data));
					});
				return Ajax;
			},
			calcDays : function (data) {
				var date_now = new Date();
				var playerArray = {};
				var dataArray = data.split(',');
				$.each(dataArray, function (index, value) {
					var obj_temp = value.split(':');
					var date_user = new Date(parseInt(obj_temp[1], 10) * 1000);
					var date_diff = date_now - date_user;
					var inactive_days = date_diff / 1000 / 60 / 60 / 24;
					var inactive_days_quarter = Math.floor(inactive_days * 4) / 4;
					playerArray[obj_temp[0]] = inactive_days_quarter;
				});
				return playerArray;
			},
			getBG : function (inactive_days) {
				var bgImage = "http://s14.directupload.net/images/140415/mju99vog.png";
				var bgPos = "";
				if (inactive_days < 2) {
					bgPos = "0 -12px";
				} else if (inactive_days >= 2 && inactive_days < 5) {
					bgPos = "0 -24px";
				} else if (inactive_days >= 5) {
					bgPos = "0 -36px";
				}
				return 'url(' + bgImage + ') no-repeat ' + bgPos + '';
			},
			createPopup : function (inactive_days) {
				var popupHTML = '';
				if (typeof inactive_days === 'undefined') {
					popupHTML += QT.Lang.get("town_info", "no_data");
				} else {
					popupHTML += '<b>' + QT.Lang.get("town_info", "inactivity") + ':</b> ' + inactive_days + ' ' + QT.Lang.get("town_info", "days");
				}
				popupHTML += '<p/><span style="font-size:10px">powered by Tondas ' + QT.Lang.get("town_info", "polissuche") + '</span>';
				return popupHTML;
			},
			addDisplay : function (style, link) {
				var p_link = (link) ? link : QT.Links.Polissuche;
				return '<a class="qt_activity" style="display:block; float:left; width:20px; height:12px; background:url(http://s1.directupload.net/images/140416/7fwyuv54.gif) no-repeat;' + style + '" href="' + p_link + '" target="_blank"><span class="qt_activity_number" style="display:block; margin-top:1px; font-size: 8px; color:#EEDDBB; text-shadow:1px 1px #000000; text-align:center"></span></a>';
			},
			changeDisplay : function (JQelement, inactive_days) {
				var number_days = Math.floor(inactive_days);
				var background = QT.Functions.Inactivity.getBG(number_days);
				if (typeof inactive_days === 'undefined') {
					number_days = '-';
				}
				$(JQelement).find(".qt_activity_number").text(number_days);
				$(JQelement).css({
					"background" : background
				});
				$(JQelement).mousePopup(new MousePopup(QT.Functions.Inactivity.createPopup(inactive_days)));
			},
			Filter : {
				coordinates : function () {
					var currentTownX = ITowns.getCurrentTown().getIslandCoordinateX();
					var currentTownY = ITowns.getCurrentTown().getIslandCoordinateY();
					return ';order_type:distance;order_x:' + currentTownX + ';order_y:' + currentTownY;
				}
			}
		},
		islandAddPlayerlinks : function (event, xhr, settings) {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_ISLAND);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			var d = $.parseJSON(xhr.responseText).json.json.town_list;
			var playerIdArray = [];
			$.each(d, function (key, town) {
				playerIdArray[town.player] = town.pid;
			});
			$("DIV#gpwnd_" + c + " DIV.island_info_left UL LI SPAN.player_name").each(function (index, element) {
				var name = $(this).text();
				var id = playerIdArray[name];
				if (id)
					$(this).html(QT.Functions.helper.grepo_playerlink(name, id));
			});
		},
		islandFarmingVillages : function () {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_ISLAND);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			$("DIV#gpwnd_" + c + " DIV.center1").css({
				"left" : "255px",
				"width" : "450px",
				"top" : "-1px"
			});
			$("DIV#gpwnd_" + c + " DIV.island_info_left").css({
				"bottom" : "0px",
				"left" : "0px",
				"position" : "absolute",
			});
			$("DIV#gpwnd_" + c + " DIV.island_info_left UL.game_list").css({
				"height" : "352px",
			});
			$("DIV#gpwnd_" + c + " DIV.island_info_right").css({
				"bottom" : "0px",
				"right" : "0px",
				"position" : "absolute",
			});
			$("DIV#gpwnd_" + c + " DIV.island_info_right UL.game_list").css({
				"height" : "382px",
			});
			if ($("DIV#gpwnd_" + c + " DIV.captain_commercial").is(":visible"))
				return;
			if (!$("DIV#gpwnd_" + c + " DIV.island_info_right UL.game_list li:first-child SPAN").hasClass("small player_name")) {
				$("DIV#gpwnd_" + c + " DIV.island_info_right UL.game_list").css({
					"height" : "100%",
				});
			}
			$("DIV#gpwnd_" + c + " DIV#farm_town_overview_btn").css({
				"top" : "486px",
			});
		},
		islandInactivity : function (event, xhr, settings) {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_ISLAND);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			var d = $.parseJSON(xhr.responseText).json.json.town_list;
			var townInfoArray = [];
			$.each(d, function (key, town) {
				townInfoArray[town.id] = town.pid;
			});
			var JQelement = $("DIV#gpwnd_" + c + " DIV.island_info_left UL LI");
			var currentTownXY = QT.Functions.Inactivity.Filter.coordinates();
			var players = [];
			JQelement.prepend(QT.Functions.Inactivity.addDisplay("margin:2px 3px 0 0;"));
			JQelement.each(function () {
				var e = $(this).find(".gp_town_link").attr("href");
				var f = e.split(/#/);
				var g = $.parseJSON(atob(f[1] || f[0]));
				var qt_activityElement = $(this).find(".qt_activity");
				if (!townInfoArray[g.id]) {
					QT.Functions.Inactivity.changeDisplay(qt_activityElement);
				} else if (QT.Functions.Inactivity.isCached(townInfoArray[g.id])) {
					var inactive_days_cached = QT.Functions.Inactivity.cache[townInfoArray[g.id]];
					QT.Functions.Inactivity.changeDisplay(qt_activityElement, inactive_days_cached);
				} else {
					players.push(townInfoArray[g.id]);
				}
				qt_activityElement.data("id", townInfoArray[g.id]).prop('href', 'http://polissuche.marco93.de/' + wID + '.html?filter=player_id:' + townInfoArray[g.id] + currentTownXY + '');
			});

			if (!players.length > 0)
				return;

			QT.Functions.Inactivity.getData(players).done(function (data) {
				JQelement.find(".qt_activity").each(function (index, element) {
					var dataID = $(this).data('id');
					QT.Functions.Inactivity.changeDisplay(this, QT.Functions.Inactivity.cache[dataID]);
				});
			});
		},
		islandMessage : function () {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_ISLAND);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			$("DIV#gpwnd_" + c + " DIV#island_towns_controls").append('<a id="q_message_island" class="q_message" href="#"></a>');
			$(".q_message").css({
				"margin-top" : "2px",
				"right" : "3px",
				"position" : "absolute",
				"height" : "23px",
				"width" : "22px",
				"background-image" : "url(http://s14.directupload.net/images/130417/4lhes4y6.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px 0px"
			});
			$(".q_message").hover(
				function () {
				$(this).css({
					"background-position" : "0px -23px"
				});
			},
				function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			});
			$("DIV#gpwnd_" + c + " .q_message").click(function () {
				var spielernamen = "";
				$("DIV#gpwnd_" + c + " #island_info_towns_left_sorted_by_name li span.player_name").each(function () {
					if ($(this).text() != pName && $(this).text() != QT.Lang.get("messages", "ghosttown") && $(this).text() != QT.Lang.get("messages", "no_cities") + "." && spielernamen.indexOf($(this).text()) < 0) {
						spielernamen += $(this).text() + ";";
					}
				});
				Layout.newMessage.open({
					recipients : spielernamen
				});
			});
		},
		messageInputwidth : function () {
			$('#message_recipients').css({
				"width" : "630px"
			});
			$('#message_subject').css({
				"width" : "630px"
			});
			$('#message_buttons').css({
				"width" : "0px"
			});
			$('#message_buttons select').css({
				"position" : "absolute",
				"right" : "3px",
				"top" : "-24px",
				"z-index" : "1000"
			});
		},
		messageViewAll : function () {
			var wnd = GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_MESSAGE);
			var wndID = wnd.getID();
			if ($(".paginator_qt").is(":visible"))
				return;
			$("DIV#gpwnd_" + wndID + " DIV#message_message_list .paginator_bg:last").after('<a id="QT_viewAll" class="paginator_bg paginator_qt" href="javascript:void(0)">' + QT.Lang.get("messages", "all") + '</a>');
			var pages = $("DIV#gpwnd_" + wndID + " DIV#message_message_list .paginator_bg").not("#QT_viewAll").length;
			var params = {
				offset : 0,
				id : Message.id
			};
			function pagesLoad() {
				gpAjax.ajaxGet('message', 'view', params, true, function (return_data) {
					var elements = return_data.html;
					var found = $('.message_post', elements);
					$('#message_post_container').append(found);
					params.offset += 10;
					if (params.offset < pages * 10)
						pagesLoad();
				});
			}
			$("#QT_viewAll").click(function () {
				$('#message_post_container').empty();
				pagesLoad();
				var prevPage = $("#paginator_selected").text();
				var paginatorOnclick = "'message_message_list', " + prevPage + ", " + params.id + ", 'message', 'view'";
				$("#paginator_selected").replaceWith('<a class="paginator_bg" onclick="paginatorTabsGotoPage(' + paginatorOnclick + ')" href="javascript:void(0)">' + prevPage + '</a>');
				$("#QT_viewAll").replaceWith('<strong id="paginator_selected" class="paginator_bg paginator_qt">' + QT.Lang.get("messages", "all") + '</strong>');
			});
		},
		messageExport : function () {
			var wnd = GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_MESSAGE);
			var wndID = wnd.getID();
			if ($("#qt_messageExport").is(":visible"))
				return;
			$("DIV#gpwnd_" + wndID + " DIV#message_message_list .game_header:first").append('<div id="qt_messageExport" style="float:right; margin-top:-19px; cursor:pointer;"><img src="http://s14.directupload.net/images/140124/8tzken7v.png"/></div><div id="qt_messageExportTMP" style="display:none"></div>');
			$("#qt_messageExport").mousePopup(new MousePopup(QT.Lang.get("messages", "export")));
			$("#qt_messageExport").click(function () {
				var bb_content = "[quote]";
				var format_search = [
					/\<b\>(.*?)\<\/b\>/ig,
					/\<i\>(.*?)\<\/i\>/ig,
					/\<u\>(.*?)\<\/u\>/ig,
					/\<s\>(.*?)\<\/s\>/ig,
					/\<center\>(.*?)\<\/center\>/ig,
					/\<a class="bbcodes bbcodes_url".+href.+url=(.*?)%3A%2F%2F(.*?)".+\>(.*?)\<\/a>/ig,
					/\<span class="bbcodes bbcodes_town"\>\<a href=\"#(.*?)\".+\<\/span\>/ig,
					/\<img src="(.*?)" alt=""\>/ig,
					/\<span class="bbcodes bbcodes_color" style="color:(.*?)"\>(.*?)\<\/span\>/ig,
					/\<span class="bbcodes bbcodes_island"\>\<a href=\"#(.*?)\" .+\<\/span\>/ig,
					/\<table.+\<tbody\>(.*?)\<\/tbody\>\<\/table\>/ig,
					/\<tr\>\<td\>/ig,
					/\<tr\>\<th\>/ig,
					/\<\/td\>\<\/tr\>/ig,
					/\<\/th\>\<\/tr\>/ig,
					/\<\/td\>/ig,
					/\<\/th\>/ig,
					/\<td\>/ig,
					/\<th\>/ig
				];
				var format_replace = [
					'[b]$1[/b]',
					'[i]$1[/i]',
					'[u]$1[/u]',
					'[s]$1[/s]',
					'[center]$1[/center]',
					'[url=$1://$2]$3[/url]',
					replaceBBtowns,
					'[img]$1[/img]',
					'[color=$1]$2[/color]',
					replaceBBislands,
					'[table]$1[/table]',
					'[*]',
					'[**]',
					'[/*]',
					'[/**]',
					'[|]',
					'[||]',
					'',
					''
				];
				function replaceBBtowns(match, p1, offset, string) {
					var a = $.parseJSON(atob(p1));
					return '[town]' + a.id + '[/town]'
				};
				function replaceBBislands(match, p1, offset, string) {
					var a = $.parseJSON(atob(p1));
					return '[island]' + a.id + '[/island]'
				};

				$("#message_post_container .message_post").each(function (index, element) {
					var qt_messageExportTMP = $("#qt_messageExportTMP");
					qt_messageExportTMP.empty();
					$(this).clone().appendTo(qt_messageExportTMP);

					qt_messageExportTMP.find(".published_report").replaceWith("[report][/report]"); //replace reports
					qt_messageExportTMP.find(".bbcode_awards").replaceWith("[img]http://s1.directupload.net/images/140428/twuzm5vx.png[/img]"); //replace awards
					qt_messageExportTMP.find(".reservation_list").replaceWith(""); //remove reservations
					qt_messageExportTMP.find(".bbcodes_spoiler").replaceWith(function () { //replace spoiler
						$(this).find(".button").remove();
						return '[spoiler=' + $("b:first", this).text() + ']' + $(".bbcodes_spoiler_text", this).html() + '[/spoiler]';
					});
					qt_messageExportTMP.find(".bbcodes_quote").replaceWith(function () { //replace quotes
						return '[quote]' + $(".quote_message", this).html() + '[/quote]';
					});
					qt_messageExportTMP.find(".bbcodes_size").replaceWith(function () { //replace size
						return '[size=' + $(this)[0].style.fontSize + ']' + $(this).html() + '[/size]';
					});
					qt_messageExportTMP.find(".bbcodes_player").replaceWith(function () { //replace player
						return '[player]' + $(this).text() + '[/player]';
					});
					qt_messageExportTMP.find(".bbcodes_ally").replaceWith(function () { //replace ally
						return '[ally]' + $(this).text() + '[/ally]';
					});
					qt_messageExportTMP.find(".bbcodes_font").replaceWith(function () { //replace font
						return '[font=' + $(this).attr('class').split(' ').pop() + ']' + $(this).html() + '[/font]';
					});
					qt_messageExportTMP.find("script").remove(); //remove script tags

					var author = $(".message_poster .gp_player_link", this).text();
					var postDate = $(".message_poster .message_date", this).text().trim();
					bb_content += '[size=7][player]' + author + '[/player] ' + postDate + '[/size]\n';
					bb_content += '[img]http://s7.directupload.net/images/140502/izczcrte.png[/img]\n';
					var postHTML = $("#qt_messageExportTMP .message_post_content").html().trim();
					postHTML = postHTML.replace(/(\r\n|\n|\r|\t)/gm, ""); //remove line-breaks, tab characters
					postHTML = postHTML.replace(/<br\s*\/?>/mg, "\n"); //add line-breaks instead of <br>
					postHTML = postHTML.replace(/&nbsp;/mg, " ") //replace &nbsp
						for (var i = 0; i < format_search.length; i++) {
							postHTML = postHTML.replace(format_search[i], format_replace[i]);
						}
						bb_content += postHTML + "\n";
					bb_content += '[img]http://s1.directupload.net/images/140502/f3i4p5oy.png[/img]';
					bb_content += "\n";
				});

				bb_content = bb_content.slice(0, -1);
				bb_content += "[/quote]";

				var expRahmen_a = "<div class='inner_box'><div class='game_border'><div class='game_border_top'></div><div class='game_border_bottom'></div><div class='game_border_left'></div><div class='game_border_right'></div><div class='game_border_corner corner1'></div><div class='game_border_corner corner2'></div><div class='game_border_corner corner3'></div><div class='game_border_corner corner4'></div><div class='game_header bold' style='height:18px;'><div style='float:left; padding-right:10px;'></div>";
				var expRahmen_b = "</div><textarea id='expTextarea' style=\"height: 228px; width: 685px;\">";
				var expRahmen_c = "</textarea></div><div style='overflow-x: hidden; padding-left: 5px; position: relative;'></div></div></div>";
				var expTitel = "Copy & Paste";
				var BBwnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_BBCODE) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_BBCODE);
				BBwnd.setTitle(QT.Lang.get("qtoolbox", "bb_codes") + " - " + QT.Lang.get("bbcode", "messages"));
				BBwnd.setContent(expRahmen_a + expTitel + expRahmen_b + bb_content + expRahmen_c);
				$("#expTextarea").focus(function () {
					var that = this;
					setTimeout(function () {
						$(that).select();
					}, 10);
				});
			});
		},
		mutationobserver : function () {
			var observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						if (mutation.addedNodes[0]) {
							if (mutation.addedNodes[0].id === "town_groups_list") {
								if (QT.Settings.values.qmenu_settings_stadtliste)
									QT.Functions.townslist();
								QT.Functions.fix_Zindex();
							}
						}
					});
				});
			observer.observe($('body').get(0), {
				attributes : false,
				childList : true,
				characterData : false
			});
		},
		openLink : function (linkArray) {
			if (QT.Settings.values.qmenu_settings_links) {
				var html = $('<iframe />', {
						id : "win_gs_s_frame",
						src : linkArray[0],
						style : 'width:'+linkArray[1]+'px;height:'+linkArray[2]+'px;border:1px solid black;'
					});
				var wnd = GPWindowMgr.Create(GPWindowMgr[linkArray[4]]) || GPWindowMgr.getOpenFirst(GPWindowMgr[linkArray[4]]);
				wnd.setTitle(linkArray[3]);
				wnd.setContent(html);
			} else {
				window.open(linkArray[0]);
			}
		},
		playerGSButton : function (event, xhr, settings) {
			var b = settings.url.match(/player_id%22%3A(\d*)%2C/);
			var c = GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_PLAYER_PROFILE);
			if (!c)
				return;
			var d = $("DIV#gpwnd_" + c.getID() + " DIV#player_buttons ");
			$(d[0]).append("<a target=_blank href=http://" + mID + ".grepostats.com/world/" + wID + "/player/" + b[1] + '><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a>')
		},
		qtoolbox : function () {
			$('#ui_box .nui_main_menu .bottom').append('<div id="qtbox_wrapper" style="position: absolute; display: block; width: 100%; bottom: 31px;"><div id="qtbox_header" style="display: block; position: relative; height: 14px; width: 100%; top: 0px; background:url(http://s7.directupload.net/images/140119/jltfmtqi.png) no-repeat"></div></div>');
			$('#ui_box .nui_main_menu .bottom').css({
				"bottom" : "-3px"
			});
			$('#ui_box .nui_main_menu .leaves').hide();
			$('#ui_box .nui_main_menu .content ul li:last-child').removeClass("last");
			$('#ui_box .nui_main_menu .content ul li:last-child span.button_wrapper').css({
				"height" : "15px"
			});
			$('#ui_box .nui_main_menu .content ul').append('<li style="height: 10px; z-index: 1"><div id="qt_mainmenu_top" style="z-index: 1; background: url(http://s7.directupload.net/images/140119/duowfxnl.png) repeat scroll 0% 0% transparent; position: absolute; width: 144px; height: 35px; margin-top: -12px;)"><a id="qtbox_main_btn" class="" style="top: 14px; left: 60px; width: 20px; height: 17px; display: block; position: absolute; background: url(http://s7.directupload.net/images/140119/nebf5887.png)" href="#"></a></div><div id="qt_mainmenu_content" style="width: 133px; position: absolute; bottom: 0px; opacity: 0.95; background: #0C1727"><ul id="qt_mainmenu_list"></ul></div></li>');
			$('#ui_box .nui_main_menu .content ul').css({
				"height" : "315px"
			});
			$("#qtbox_main_btn").hover(
				function () {
				$(this).css({
					"background-image" : "url(http://s7.directupload.net/images/140119/ywi4jbg2.png)"
				});
			},
				function () {
				$(this).css({
					"background-image" : "url(http://s7.directupload.net/images/140119/nebf5887.png)"
				});
			});

			var qtbox_main_array = [
				[QT.Lang.get("qtoolbox", "stats"), "http://s1.directupload.net/images/140125/vnghthhz.png", "",
					[QT.Lang.get("qtoolbox", "grepostats"), "http://s1.directupload.net/images/121012/zzydmra8.png", "",
						[QT.Lang.get("qtoolbox", "player"), "http://s1.directupload.net/images/121012/8xgicpg7.png", "link_gs_player"],
						[QT.Lang.get("qtoolbox", "alliance"), "http://s7.directupload.net/images/121012/4kfl493a.png", "link_gs_alliance"],
						[QT.Lang.get("qtoolbox", "rankings"), "http://s14.directupload.net/images/121012/p2otvkuz.png", "link_gs_rankings"]],
					[QT.Lang.get("qtoolbox", "grepo_intel"), "http://s14.directupload.net/images/130403/u33cb3b8.jpg", "",
						[QT.Lang.get("qtoolbox", "track_player"), "http://s1.directupload.net/images/121012/8xgicpg7.png", "link_gi_player"],
						[QT.Lang.get("qtoolbox", "track_alliance"), "http://s7.directupload.net/images/121012/4kfl493a.png", "link_gi_alliance"],
						[QT.Lang.get("qtoolbox", "top_killers"), "http://s14.directupload.net/images/121012/p2otvkuz.png", "link_gi_topkillers"]],
					[QT.Lang.get("qtoolbox", "grepo_bash"), "http://s14.directupload.net/images/140615/x766ldmm.png", "link_grepobash"],
					[QT.Lang.get("qtoolbox", "quo"), "http://s7.directupload.net/images/140615/fhkhdsdc.png", "link_quo"]],
				[QT.Lang.get("qtoolbox", "maps"), "http://s1.directupload.net/images/121012/4hbt2ofa.png", "",
					[QT.Lang.get("qtoolbox", "grepo_maps"), "http://s1.directupload.net/images/121012/4hbt2ofa.png", "link_maps_grepomaps"],
					[QT.Lang.get("qtoolbox", "grepo_intel"), "http://s14.directupload.net/images/130403/u33cb3b8.jpg", "link_maps_grepointel"]],
				[QT.Lang.get("qtoolbox", "townsearches"), "http://s14.directupload.net/images/121012/vlnknenk.png", "",
					[QT.Lang.get("qtoolbox", "tonda_polissuche"), "http://polissuche.marco93.de/favicon.ico", "link_polissuche"],
					[QT.Lang.get("qtoolbox", "grepo_finder"), "http://s14.directupload.net/images/140913/5c6ak7br.jpg", "link_grepofinder"]],
				[QT.Lang.get("qtoolbox", "bb_codes"), "http://s14.directupload.net/images/140124/8tzken7v.png", "",
					[QT.Lang.get("bbcode", "troops"), "http://s1.directupload.net/images/121012/a2w2xe8r.png", "",
						[QT.Lang.get("qtoolbox", "in_town"), "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_intown"],
						[QT.Lang.get("qtoolbox", "from_town"), "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_fromtown"]],
					//[QT.Lang.get("qtoolbox","outside"), "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_outer"]
					[QT.Lang.get("bbcode", "cities"), "http://s7.directupload.net/images/140121/3l6c8vw4.png", "",
						[QT.Lang.get("bbcode", "all"), "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_cities_all"],
						[QT.Lang.get("bbcode", "active_grp"), "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_cities_grp"]],
					[QT.Lang.get("bbcode", "building"), "http://cdn.grepolis.com/images/game/overviews/main_20x20.png", "bbcode_buildings"]],
				[QT.Lang.get("qtoolbox", "display_modes"), "http://s7.directupload.net/images/121012/2erjlsv4.png", "",
					[QT.Lang.get("qtoolbox", "full_screen"), "http://s7.directupload.net/images/121012/2erjlsv4.png", "fullscreenmode"]],
				[QT.Lang.get("qtoolbox", "unit_comparison"), "http://s7.directupload.net/images/121012/xli4g4p8.png", "unitcomparison"],
				[QT.Lang.get("qtoolbox", "google_docs"), "http://s14.directupload.net/images/121012/cbromm2l.png", "googledocs"],
				[QT.Lang.get("qtoolbox", "stats_scripts"), "http://s14.directupload.net/images/130418/rpccjan7.png", "statsandscripts"],
				[QT.Lang.get("qtoolbox", "settings"), "http://s14.directupload.net/images/121012/xg4fgyo5.png", "scriptmanager"]
			];
			
			var linkArray = {
				gs_player : [QT.Links.GS_Spieler, "970", "500", QT.Lang.get("qtoolbox", "player"), "TYPE_QT_GREPOSTATS"],
				gs_alliance : [QT.Links.GS_Allianz, "970", "500", QT.Lang.get("qtoolbox", "alliance"), "TYPE_QT_GREPOSTATS"],
				gs_rankings : [QT.Links.GS_Bash, "970", "500", QT.Lang.get("qtoolbox", "rankings"), "TYPE_QT_GREPOSTATS"],
				gi_player : [QT.Links.GrepoIntelPlayer, "1010", "500", QT.Lang.get("qtoolbox", "track_player"), "TYPE_QT_GREPOINTEL"],
				gi_alliance : [QT.Links.GrepoIntelAlliance, "1010", "500", QT.Lang.get("qtoolbox", "track_alliance"), "TYPE_QT_GREPOINTEL"],
				gi_topkillers : [QT.Links.GrepoIntelKillers, "1010", "500", QT.Lang.get("qtoolbox", "top_killers"), "TYPE_QT_GREPOINTEL"],
				grepobash : [QT.Links.GrepoBash, "970", "500", QT.Lang.get("qtoolbox", "grepo_bash"), "TYPE_QT_BASHLISTS"],
				quo : [QT.Links.quo, "970", "500", QT.Lang.get("qtoolbox", "quo"), "TYPE_QT_BASHLISTS"],
				maps_grepomaps : [QT.Links.GrepoMaps, "1035", "500", QT.Lang.get("qtoolbox", "grepo_maps"), "TYPE_QT_SERVERMAPS"],
				maps_grepointel : [QT.Links.GrepoIntelMap, "1035", "500", QT.Lang.get("qtoolbox", "grepo_intel"), "TYPE_QT_SERVERMAPS"],
				grepofinder : [QT.Links.Grepofinder, "970", "500", QT.Lang.get("qtoolbox", "grepo_finder"), "TYPE_QT_TOWNSEARCHES"],
				polissuche : [QT.Links.Polissuche, "970", "500", QT.Lang.get("qtoolbox", "tonda_polissuche"), "TYPE_QT_TOWNSEARCHES"],

			};
			
			var qtbox_main_items = [];
			var qt_mainmenu_content_h = -12;
			qt_mainmenu_content_h -= 18;
			$.each(qtbox_main_array, function (i, e) {
				qt_mainmenu_content_h -= 12;
				qtbox_main_items.push('<li><div class="qmenu_nav_cat" style="background-image: url(' + e[1] + ')"><span id="' + e[2] + '">' + e[0] + '</span></div>');
				if (e.length > 3) {
					qtbox_main_items.push("<span class='qmenu_arrow_span'> &#9658;</span>");
					qtbox_main_items.push('<ul class="qmenu_window"><li class="qmenu_window_first"></li>');
					$.each(e.slice(3), function (j, f) {
						qtbox_main_items.push('<li><div class="qmenu_nav_cat" style="background-image: url(' + f[1] + ')"><span id="' + f[2] + '">' + f[0] + '</span></div>');
						if (f.length > 3) {
							qtbox_main_items.push("<span class='qmenu_arrow_span'> &#9658;</span>");
							qtbox_main_items.push('<ul class="qmenu_window"><li class="qmenu_window_first"></li>');
							$.each(f.slice(3), function (k, g) {
								qtbox_main_items.push('<li><div class="qmenu_nav_cat" style="background-image: url(' + g[1] + ')"><span id="' + g[2] + '">' + g[0] + '</span></div>');
								qtbox_main_items.push('</li>');
							});
							qtbox_main_items.push('<li class="qmenu_window_last"></li></ul>');
						}
						qtbox_main_items.push('</li>');
					});
					qtbox_main_items.push('<li class="qmenu_window_last"></li></ul>');
				}
				qtbox_main_items.push('</li>');
			});

			$('#qt_mainmenu_list').append(qtbox_main_items.join(''));
			
			$('.qmenu_nav_cat span').click(function () {
				if ($(this).prop("id").length > 0) {
					if (this.id.substring(0, 6) === "bbcode") {
						QT.Functions.bbcodes(this.id);
					} else if (this.id.substring(0, 4) === "link") {
						QT.Functions.openLink(linkArray[this.id.substr(5)]);
					} else {
						QT.Functions[this.id]();
					}
					$("#qtbox_main_btn").click();
				}
			});

			$("#qt_mainmenu_list").css({
				"display" : "none",
				"height" : "100%",
				"text-align" : "left",
				"padding" : "10px 0px 5px 0px"
			});
			$("#qt_mainmenu_list li").css({
				"background" : "none",
				"height" : "12px"
			});
			$(".qmenu_nav_cat").css({
				"display" : "block",
				"width" : "9px",
				"height" : "10px",
				"margin-top" : "1px",
				"padding" : "0px 5px",
				"background-size" : "10px 9px",
				"float" : "left",
				"background-repeat" : "no-repeat",
				"background-position" : "center 2px"
			});
			$(".qmenu_nav_cat span").css({
				"width" : "114px",
				"padding-left" : "14px",
				"display" : "block"
			});
			$(".qmenu_arrow_span").css({
				"position" : "absolute",
				"right" : "5px"
			});
			$(".qmenu_window").css({
				"display" : "none",
				"position" : "absolute",
				"left" : "135px",
				"top" : "-8px",
				"width" : "142px",
				"background" : "url(http://s7.directupload.net/images/140120/6waopcew.png)"
			});
			$(".qmenu_window ul").css({
				"z-index" : "3"
			});
			$(".qmenu_window li").css({
				"padding-left" : "3px"
			});
			$(".qmenu_window_first").css({
				"height" : "10px",
				"width" : "142px",
				"padding" : "0",
				"margin-top" : "-2px",
				"background" : "url(http://s7.directupload.net/images/140119/gxng9w7z.png)"
			});
			$(".qmenu_window_last").css({
				"height" : "8px",
				"width" : "142px",
				"padding" : "0",
				"margin-top" : "2px",
				"background" : "url(http://s1.directupload.net/images/140119/y7dq3n8j.png)"
			});

			$("#qt_mainmenu_list li").hover(function () {
				$(this).children("ul").show();
			}, function () {
				$(this).children("ul").hide();
			}); //
			$("#qtbox_main_btn").click(function () {
				if ($("#qt_mainmenu_list").is(':hidden')) {
					$('#qt_mainmenu_top').css({
						"margin-top" : "-26px"
					});
					$('#qt_mainmenu_top').animate({
						marginTop : qt_mainmenu_content_h + "px"
					}, 400);
				} else {
					$('#qt_mainmenu_top').animate({
						marginTop : "-12px"
					}, 400);
				}
				$("#qt_mainmenu_list").slideToggle();
			});

			//http://s1.directupload.net/images/131007/lmgv3ubf.png
			//$('#ui_box .nui_left_box').append('<div id="qtbar_wrapper" style="position: absolute; width: 143px; height: 32px; top: 191px; background:url(http://s1.directupload.net/images/131031/u9atg7v6.png) no-repeat"></div>');
			//$('#ui_box .nui_main_menu').css({"top": "+=32px"});

			// Buttonbox
			if (QT.Settings.values.qmenu_settings_buttonbar) {
				$('#qtbox_wrapper').append('<div id="qtbox_buttons_wrapper" style="display: block; position: relative; height: 26px; width: 100%; bottom: 0px; background:url(http://s7.directupload.net/images/131007/wh2uwdro.png) no-repeat"></div>');
				$('#ui_box .nui_main_menu .bottom, #ui_box .nui_main_menu .leaves').css({
					"bottom" : "-=27px"
				});
				$('#qtbox_buttons_wrapper').append('<a id="qtbox_button1" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 3px;" target="_blank" href="' + QT.Links.GS_Spieler + '"><img src="http://s1.directupload.net/images/131008/ktvkyrx8.png"></a><a id="qtbox_button2" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 29px;" target="_blank" href="' + QT.Links.GrepoIntelPlayer + '"><img src="http://s1.directupload.net/images/131008/2hr8vbhw.png"></a><a id="qtbox_button3" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 55px;" target="_blank" href="' + QT.Links.GrepoBash + '"><img src="http://s14.directupload.net/images/131008/wfe9ficd.png"></a><a id="qtbox_button4" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 81px;" target="_blank" href="' + QT.Links.GrepoMaps + '"><img src="http://s7.directupload.net/images/131007/hdh4farx.png"></a><a id="qtbox_button5" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 107px;" target="_blank" href="' + QT.Links.Polissuche + '"><img src="http://s7.directupload.net/images/131008/5zj4ujmi.png"></a>');
				$('#qtbox_button1').mousePopup(new MousePopup(QT.Lang.get("qtoolbox", "grepostats")));
				$('#qtbox_button2').mousePopup(new MousePopup(QT.Lang.get("qtoolbox", "grepo_intel")));
				$('#qtbox_button3').mousePopup(new MousePopup(QT.Lang.get("qtoolbox", "grepo_bash")));
				$('#qtbox_button4').mousePopup(new MousePopup(QT.Lang.get("qtoolbox", "grepo_maps")));
				$('#qtbox_button5').mousePopup(new MousePopup(QT.Lang.get("qtoolbox", "tonda_polissuche")));

				$(".qtbox_button").hover(
					function () {
					$(this).css({
						"background" : "url(http://s7.directupload.net/images/131008/vyhnznhd.png)"
					});
				},
					function () {
					$(this).css({
						"background" : "none"
					});
				});
			}
			//Online Counter
			if (QT.Settings.values.qmenu_settings_counter) {
				$('#qtbox_wrapper').append('<div id="qtbox_clock_wrapper" style="display: block; position: relative; height: 21px; width: 100%; background:url(http://s7.directupload.net/images/131007/desspey5.png) no-repeat"><a id="qt_clock_clock" style="display: block; position: absolute; height: 17px; background: url(http://s7.directupload.net/images/131007/qqcsqnfm.png) no-repeat scroll 0px 2px transparent; margin-left: 5px; width: 127px;" href="#"><span id="qt_clock_span" style="display: block; color: #EEDDBB; font-size: 9px; width: 110px; position: absolute; bottom: 2px; margin-left: 10px;"></span></a></div>');
				$('#ui_box .nui_main_menu .bottom, #ui_box .nui_main_menu .leaves').css({
					"bottom" : "-=21px"
				});
				$("#qt_clock_clock").click(function () {
					(counterview === 0) ? counterview = 1 : counterview = 0;
				});
				$('#qt_clock_clock').mousePopup(new MousePopup(QT.Lang.get("qtoolbox", "onlinecounter_switch")));
				sec = -1;
				min = 0;
				hour = 0;
				counterview = 0;
				function counttime() {
					QT.Settings.values.onlinetotal++;
					sec++;
					if (sec === 60) {
						sec = 0;
						min = min + 1;
					}
					if (min === 60) {
						min = 0;
						hour += 1;
					}
					var hour_total = parseInt(QT.Settings.values.onlinetotal / 3600);
					var min_total = parseInt(QT.Settings.values.onlinetotal / 60 - hour_total * 60);
					var sec_total = QT.Settings.values.onlinetotal - (hour_total * 3600) - (min_total * 60);
					if (counterview === 0) {
						timer = QT.Lang.get("qtoolbox", "onlinecounter_now") + ": " + ((hour <= 9) ? "0" + hour : hour) + ":" + ((min <= 9) ? "0" + min : min) + ":" + ((sec <= 9) ? "0" + sec : sec);
					} else if (counterview === 1) {
						timer = QT.Lang.get("qtoolbox", "onlinecounter_total") + ": " + ((hour_total <= 9) ? "0" + hour_total : hour_total) + ":" + ((min_total <= 9) ? "0" + min_total : min_total) + ":" + ((sec_total <= 9) ? "0" + sec_total : sec_total);
					}
					if (!QT.Settings.values.qmenu_settings_counter_aktiv) {
						QT.Settings.save("onlinetotal", QT.Settings.values.onlinetotal);
					}
					$("#qt_clock_span").html(timer);
					window.setTimeout(function () {
						counttime();
					}, 1000);
				}
				counttime();
			}
		
		},
		questlist : function () {
			$('#quest_overview').prepend("<li id='q_qadd'><ul><li id='q_lock'></li><li id='q_qarrow'></li><li id='q_qhide'></li></ul></li>");
			$('#q_qadd').css({
				"cursor" : "pointer",
				"z-index" : "4",
				"height" : "20px",
				"width" : "52px",
				"margin-left" : "9px",
				"margin-top" : "-20px",
				"position" : "absolute",
				"background" : "url('http://s7.directupload.net/images/130417/mvyxzaeg.png') no-repeat scroll transparent"
			});
			$('#q_lock')
			.css({
				"cursor" : "pointer",
				"z-index" : "5",
				"height" : "16px",
				"width" : "10px",
				"margin-left" : "3px",
				"margin-top" : "3px",
				"position" : "absolute",
				"background" : "url('http://s7.directupload.net/images/130412/7pi7gioz.png') no-repeat scroll 0px 0px / 21px 14px transparent"
			})
			.hover(function () {
				$(this).css({
					"background-position" : "-10px 0px"
				});
			}, function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			})
			.toggle(
				function () {
				$('#quest_overview').draggable({
					disabled : false
				});
				$(this).css({
					"width" : "14px",
					"background" : "url('http://s7.directupload.net/images/130412/pnljoi2y.png') no-repeat scroll 0px 0px / 28px 14px transparent"
				})
				.off('hover')
				.hover(function () {
					$(this).css({
						"background-position" : "-14px 0px"
					});
				}, function () {
					$(this).css({
						"background-position" : "0px 0px"
					});
				});
			},
				function () {
				$('#quest_overview').draggable({
					disabled : true
				});
				$(this).css({
					"width" : "10px",
					"background" : "url('http://s7.directupload.net/images/130412/7pi7gioz.png') no-repeat scroll 0px 0px / 21px 14px transparent"
				})
				.off('hover')
				.hover(function () {
					$(this).css({
						"background-position" : "-10px 0px"
					});
				}, function () {
					$(this).css({
						"background-position" : "0px 0px"
					});
				});
			});
			$('#q_qarrow')
			.css({
				"cursor" : "pointer",
				"z-index" : "5",
				"height" : "16px",
				"width" : "10px",
				"margin-left" : "16px",
				"margin-top" : "3px",
				"position" : "absolute",
				"background" : "url('http://s1.directupload.net/images/130417/ayoe9glf.png') no-repeat scroll 0px 0px / 21px 14px transparent"
			})
			.hover(function () {
				$(this).css({
					"background-position" : "-11px 0px"
				});
			}, function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			})
			.toggle(
				function () {
				QT.Settings.save("qmenu_settings_questpfeil", false);
				QT.Settings.values.qmenu_settings_questpfeil = false;
				$('<style id="qarrowstyle" type="text/css">.helper_arrow {display: none}</style>').appendTo('head');
			},
				function () {
				QT.Settings.delete("qmenu_settings_questpfeil");
				QT.Settings.values.qmenu_settings_questpfeil = true;
				$('#qarrowstyle').remove();
			});
			if (!QT.Settings.values.qmenu_settings_questpfeil) {
				$('#q_qarrow').click();
			}
			$('#q_qhide')
			.css({
				"z-index" : "5",
				"height" : "16px",
				"width" : "16px",
				"margin-left" : "28px",
				"margin-top" : "5px",
				"position" : "absolute",
				"background" : "url('http://s14.directupload.net/images/130417/5vowoe8a.png') no-repeat scroll 0px 0px / 31px 11px transparent"
			})
			.hover(function () {
				$(this).css({
					"background-position" : "-16px 0px"
				});
			}, function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			})
			.click(function () {
				$('#quest_overview li[id*="quest"]').each(function () {
					$(this).toggle();
				});
			});
		},
		reportsColor : function () {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_REPORT);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "attacking") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid red"
				}).addClass("angriffe");
			});
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "supporting") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid green"
				}).addClass("unterstützungen");
			});
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "support") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid green"
				}).addClass("unterstützungen");
			});
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "spy") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid blue"
				}).addClass("spios");
			});
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "spying") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid blue"
				}).addClass("spios");
			});
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "conquered") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid black"
				});
			});
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "enacted") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid purple"
				}).addClass("zauber");
			});
			$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang.get("reports", "farming_village") + "')").each(function () {
				$(this).css({
					"border-left" : "5px solid yellow"
				}).addClass("farm");
			});
		},
		reportsFilter : function () {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_REPORT);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			if (!$("#qmenu_berichte_icon_wrapper").is(":visible")) {
				$('<div id="qmenu_berichte_icon_wrapper" style="display:inline;position:absolute;margin-top:-1px;margin-left:120px"></div>').appendTo("DIV#gpwnd_" + c + " #es_page_reports");
				$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: 0 0;"><input type="checkbox" id="angriffe" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
				$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: -24px 0;"><input type="checkbox" id="unterstützungen" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
				$('<label class="qmenu_berichte_Icon" style="background-image: url(http://s1.directupload.net/images/130116/7hzmc2e7.png);"><input type="checkbox" id="zauber" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
				$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: -72px 0;"><input type="checkbox" id="spios" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
				$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: -96px 0;"><input type="checkbox" id="farm" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
				$(".qmenu_berichte_Icon").css({
					'display' : 'inline-block',
					'background-repeat' : 'no-repeat',
					'width' : '24px',
					'height' : '24px',
					'position' : 'relative',
					'float' : 'left',
					'margin-left' : '24px'
				});
				$(".qmenu_berichte_checkbox").css({
					'margin-top' : '5px',
					'margin-left' : '29px'
				});
				$(".qmenu_berichte_checkbox").click(function () {
					classid = this.id;
					var checkBoxes = $("li." + classid + " INPUT[type='checkbox']");
					checkBoxes.attr("checked", !checkBoxes.attr("checked"));
				});
			}
		},
		reportsLosses : function () {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_REPORT);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			if (document.getElementById('RepConvRes')) {
				document.getElementById('RepConvRes').style.visibility = "hidden";
			}
			if ($("DIV#gpwnd_" + c + " DIV#report_arrow img").length <= 0) {
				return;
			}
			var report_type = $("DIV#gpwnd_" + c + " DIV#report_arrow img").attr("src").replace(/.*\/([a-z_]*)\.png.*/, "$1");
			switch (report_type) {
			case "attack":
			case "take_over":
			case "breach":
				var AttackUnitsRessources = {
					unit_w : 0,
					unit_s : 0,
					unit_i : 0,
					unit_f : 0,
					unit_p : 0,
					total_w : 0,
					total_s : 0,
					total_i : 0,
					total_f : 0,
					total_p : 0
				};
				var DefenseUnitsRessources = {
					unit_w : 0,
					unit_s : 0,
					unit_i : 0,
					unit_f : 0,
					unit_p : 0,
					total_w : 0,
					total_s : 0,
					total_i : 0,
					total_f : 0,
					total_p : 0
				};
				if ($("DIV#gpwnd_" + c + " DIV#resources").length) {
					$("DIV#gpwnd_" + c + " .report_side_attacker_unit").each(function (index, value) {
						var unitNumber = $("span.report_losts", this).text();
						var unitName = $("div.report_unit", this).attr("class").split(/\s/);
						unitName = unitName[5];

						if (unitName != "militia" && unitNumber != "-?") {
							AttackUnitsRessources.unit_w = Math.abs(GameData.units[unitName].resources.wood * unitNumber);
							AttackUnitsRessources.unit_s = Math.abs(GameData.units[unitName].resources.stone * unitNumber);
							AttackUnitsRessources.unit_i = Math.abs(GameData.units[unitName].resources.iron * unitNumber);
							AttackUnitsRessources.unit_f = Math.abs(GameData.units[unitName].favor * unitNumber);
							AttackUnitsRessources.unit_p = Math.abs(GameData.units[unitName].population * unitNumber);
							AttackUnitsRessources.total_w += AttackUnitsRessources.unit_w;
							AttackUnitsRessources.total_s += AttackUnitsRessources.unit_s;
							AttackUnitsRessources.total_i += AttackUnitsRessources.unit_i;
							AttackUnitsRessources.total_f += AttackUnitsRessources.unit_f;
							AttackUnitsRessources.total_p += AttackUnitsRessources.unit_p;
							var unitPopup = GameData.units[unitName].name + '<div style="margin-top: 5px; margin-bottom:5px; height: 1px; border: none; background: #B48F45"/><img src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_w + '<br> <img src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_s + '<br> <img src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_i + '<br> <img src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_f + '<br> <img src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_p;
							$("div.report_unit", this).mousePopup(new MousePopup(unitPopup));
						}
					});
					$("DIV#gpwnd_" + c + " .report_side_defender_unit").each(function (index, value) {
						var unitNumber = $("span.report_losts", this).text();
						var unitName = $("div.report_unit", this).attr("class").split(/\s/);
						unitName = unitName[5];

						if (unitName != "militia" && unitNumber != "-?") {
							DefenseUnitsRessources.unit_w = Math.abs(GameData.units[unitName].resources.wood * unitNumber);
							DefenseUnitsRessources.unit_s = Math.abs(GameData.units[unitName].resources.stone * unitNumber);
							DefenseUnitsRessources.unit_i = Math.abs(GameData.units[unitName].resources.iron * unitNumber);
							DefenseUnitsRessources.unit_f = Math.abs(GameData.units[unitName].favor * unitNumber);
							DefenseUnitsRessources.unit_p = Math.abs(GameData.units[unitName].population * unitNumber);
							DefenseUnitsRessources.total_w += DefenseUnitsRessources.unit_w;
							DefenseUnitsRessources.total_s += DefenseUnitsRessources.unit_s;
							DefenseUnitsRessources.total_i += DefenseUnitsRessources.unit_i;
							DefenseUnitsRessources.total_f += DefenseUnitsRessources.unit_f;
							DefenseUnitsRessources.total_p += DefenseUnitsRessources.unit_p;
							var unitPopup = GameData.units[unitName].name + '<div style="margin-top: 5px; margin-bottom:5px; height: 1px; border: none; background: #B48F45"/><img src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_w + '<br> <img src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_s + '<br> <img src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_i + '<br> <img src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_f + '<br> <img src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_p;
							$("div.report_unit", this).mousePopup(new MousePopup(unitPopup));
						}
					});
					$("DIV#gpwnd_" + c + " DIV#resources").append('<p><table><tr><td width="50%">' + AttackUnitsRessources.total_w + '</td><td><img class="unit_order_res wood" alt="' + GameData.resources.wood + '" src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/></td><td width="50%">' + DefenseUnitsRessources.total_w + '</td></tr><tr><td>' + AttackUnitsRessources.total_s + '</td><td><img class="unit_order_res stone" alt="' + GameData.resources.stone + '" src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_s + '</td></tr><tr><td>' + AttackUnitsRessources.total_i + '</td><td><img class="unit_order_res iron" alt="' + GameData.resources.iron + '" src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_i + '</td></tr><tr><td>' + AttackUnitsRessources.total_f + '</td><td><img class="unit_order_res favor" alt="' + GameData.favor + '" src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_f + '</td></tr><tr><td>' + AttackUnitsRessources.total_p + '</td><td><img class="unit_order_res population" alt="' + GameData.population + '" src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_p + "</td></tr></table>")
				}
			}
		},
		reportsMove : function () {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_REPORT);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();
			var folder = "";
			$("DIV#gpwnd_" + c + " #folder_menu_reports a").each(function () {
				folder += "<option value=" + $(this).parent().attr("name").substr(7) + ">" + $(this).text() + "</option>";
			});
			if (!$('#qselect').is(':visible') && folder.length > 0) {
				$("DIV#gpwnd_" + c + " #report_reports").append('<select id="qselect"><option disabled selected>' + QT.Lang.get("reports", "choose_folder") + '</option>' + folder + '</select>');
				$("#qselect").css({
					'margin-top' : '5px',
					'margin-left' : '2px'
				});
				$("#qselect").change(function () {
					var params = {
						folder_id : this.options[this.selectedIndex].value,
						report_ids : Reports.getReportsIds()
					};
					Layout.wnd.getOpenFirst(Layout.wnd.TYPE_REPORT).requestContentPost('report', 'move', params);
					this.options[0].selected = true;
				});
				$("DIV#gpwnd_" + c + " #folder_menu_reports").hide();
				$("DIV#gpwnd_" + c + " #report_list").removeClass("with_menu");
			}
		},
		reportFoldersort : function () {
			var b = GPWindowMgr.getOpen(Layout.wnd.TYPE_REPORT);
			if (b.length == 0)
				return;
			wnd = b[b.length - 1];
			var c = wnd.getID();

			var foldersContainer = $("DIV#gpwnd_" + c + " #folder_menu_reports .hor_scrollbar_cont");
			var folders = $("DIV#gpwnd_" + c + " #folder_menu_reports SPAN.folder");

			folders.sort(function (a, b) {
				var an = $(a).text().trim(),
				bn = $(b).text().trim();
				if (an > bn) {
					return 1;
				}
				if (an < bn) {
					return -1;
				}
				return 0;
			});
			folders.appendTo(foldersContainer);
		},
		scriptmanager : function () {
			var grepoGameBorder = '<div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;padding:3px 11px">';
			var inhalte = {
				qset_tab1 : tab1(),
				qset_tab2 : tab2(),
				qset_tab3 : tab3()
			};
			function tab1() {
				var inhalt_tab1 = [];
				inhalt_tab1[0] = [QT.Lang.get("settings", "text13"), {
						"onlinecounter" : [QT.Lang.get("settings", "text2"), [["qmenu_settings_counter", QT.Lang.get("settings", "text9")], ["qmenu_settings_counter_aktiv", QT.Lang.get("settings", "text11")]]],
						"buttonbar" : [QT.Lang.get("settings", "text6"), [["qmenu_settings_buttonbar", QT.Lang.get("settings", "text9")]]],
						"plusmenu" : [QT.Lang.get("settings", "text5"), [["qmenu_settings_plusmenu", QT.Lang.get("settings", "text9")]]],
						"cityview" : [QT.Lang.get("settings", "text52"), [["qmenu_settings_cityview_BTN", QT.Lang.get("settings", "text41")], ["qmenu_settings_cityview_window", QT.Lang.get("settings", "text53")]]],
						"hotkeys" : [QT.Lang.get("settings", "text22"), [["qmenu_settings_hotkey_anzeige", QT.Lang.get("settings", "text9")]]],
						"bbcode_btn" : [QT.Lang.get("settings", "text31"), [["qmenu_settings_townbb", QT.Lang.get("settings", "text9")]]],
						"transportcalc" : [QT.Lang.get("settings", "text12"), [["qmenu_settings_transport_rechner", QT.Lang.get("settings", "text9")]]]
					}
				];
				inhalt_tab1[1] = [QT.Lang.get("settings", "text14"), {
						"berichtemod" : [QT.Lang.get("settings", "text15"), [["qmenu_settings_berichte_farben", QT.Lang.get("settings", "text16")], ["qmenu_settings_berichte_filter", QT.Lang.get("settings", "text17")], ["qmenu_settings_berichte_move", QT.Lang.get("settings", "text30")], ["qmenu_settings_berichte_losses", QT.Lang.get("settings", "text42")], ["qmenu_settings_berichte_sortfolders", QT.Lang.get("settings", "text49")]]],
						"grepopoints" : [QT.Lang.get("settings", "text24"), [["qmenu_settings_grepopoints", QT.Lang.get("settings", "text25")]]],
						"forummod" : [QT.Lang.get("settings", "text20"), [["qmenu_settings_maximize_forum", QT.Lang.get("settings", "text21")], ["qmenu_settings_forumdelete", QT.Lang.get("settings", "text32")]]],
						"akademiemod" : [QT.Lang.get("settings", "text35"), [["qmenu_settings_akademieplaner", QT.Lang.get("settings", "text27")]]],
						"trademod" : [QT.Lang.get("settings", "text26"), [["qmenu_settings_tradeimprovement", QT.Lang.get("settings", "text27")]]],
						"townlistmod" : [QT.Lang.get("settings", "text28"), [["qmenu_settings_stadtliste", QT.Lang.get("settings", "text27")]]],
						"questlistmod" : [QT.Lang.get("settings", "text29"), [["qmenu_settings_questliste", QT.Lang.get("settings", "text27")], ["qmenu_settings_questpfeil", QT.Lang.get("settings", "text50")]]],
						"cavemod_admin" : [QT.Lang.get("settings", "text34"), [["qmenu_settings_hidessort", QT.Lang.get("settings", "text37")], ["qmenu_settings_hidessilver", QT.Lang.get("settings", "text38")]]],
						"cavemod_town" : [QT.Lang.get("settings", "text36"), [["qmenu_settings_hidesilver", QT.Lang.get("settings", "text38")]]],
						"farmhelper" : [QT.Lang.get("settings", "text40"), [["qmenu_settings_farmhelper", QT.Lang.get("settings", "text27")], ["qmenu_settings_farmhelper_hidecities", QT.Lang.get("settings", "text51")]]],
						"island" : [QT.Lang.get("settings", "text44"), [["qmenu_settings_island_villages", QT.Lang.get("settings", "text45")]]],
						"hotkeys" : [QT.Lang.get("settings", "text46"), [["qmenu_settings_hotkey_jump", QT.Lang.get("settings", "text47")], ["qmenu_settings_hotkey_active", QT.Lang.get("settings", "text27")]]],
						"other" : [QT.Lang.get("settings", "other"), [["qmenu_settings_links", QT.Lang.get("settings", "text3")]]]
					}
				];
				var HTML_tab1 = "";
				HTML_tab1 += grepoGameBorder + QT.Lang.get("settings", "settings") + '</div>';
				HTML_tab1 += '<div id="settings_content" class="contentDiv" style="padding:0 5px; overflow: auto; height:379px">';
				$.each(inhalt_tab1, function (a, b) {
					HTML_tab1 += '<div style="margin-top: 5px; padding: 5px; border: 1px solid #B48F45"><span><b>' + b[0] + '</b></span><br />';
					$.each(b[1], function (c, d) {
						HTML_tab1 += "<div style='margin:2px 0'>" + d[0] + "<br/>";
						$.each(d[1], function (e, f) {
							var checked = (QT.Settings.values[f[0]] === true) ? "checked" : "";
							HTML_tab1 += '<div id="' + f[0] + '" class="qbox checkbox_new ' + checked + '"><div class="cbx_icon"></div><div class="cbx_caption">' + f[1] + '</div></div><br/>';
						});
						HTML_tab1 += "</div>";
					});
					HTML_tab1 += '</div>';
				});
				HTML_tab1 += '</div></div>';
				HTML_tab1 += QT.Functions.helper.grepo_btn("qmenu_einstellungen_reset_BTN", QT.Lang.get("settings", "reset"))[0].outerHTML;
				HTML_tab1 += QT.Functions.helper.grepo_btn("qmenu_einstellungen_safe_BTN", QT.Lang.get("settings", "save"))[0].outerHTML;
				return HTML_tab1;
			}
			function tab2() {
				var supported_lang = [QT.Lang.get("settings", "info"), QT.Lang.get("settings", "add_lang")];
				$.each(QT.Lang, function (a, b) {
					if (a != "get") {
						supported_lang.push(a);
					}
				});
				var HTML_tab2 = '';
				var q_translations = {
					BR : "==CrAZyWoW==, douglasgoclv",
					CZ : "jarajanos, Apolon Foibos, jarajanos",
					DE : "Quackmaster, Scav77",
					EN : "Quackmaster",
					ES : "Jonh Snow, F0NT3, cuervobrujo",
					FR : "higter, Mazelys, jbrek, ToolFire, aldo666",
					GR : "drmacsoft, adipas.ioannis, juvekdk, ΤζονακοςΚ",
					HU : "Arminno, Betagamer, Shia-ko",
					IT : "masale81",
					NL : "Quackmaster, Florent15, sannelos, megaabelleke, Thodoris, HGamert, Siloperg47",
					PL : "Slietie, Tropsy Kretts, Polny Konik, danon2",
					RO : "BaietelulCelFrumusel",
					RU : "Jest, DJEDIVER, nihondzin, Jestex"
				};
				HTML_tab2 += grepoGameBorder + QT.Lang.get("settings", "translations") + '<div style="float: right; margin-top: -2px; margin-right: -5px">' + QT.Functions.helper.grepo_dropdown("langdiv", supported_lang)[0].outerHTML + '</div></div>';
				HTML_tab2 += '<div id="trans_content" class="contentDiv" style="padding:5px 10px; overflow: auto; height:369px"><b>' + QT.Lang.get("settings", "please_note") + ':</b><br/><ul style="list-style:square outside;padding-left: 13px"><li>' + QT.Lang.get("settings", "trans_infotext1") + '</li><li>' + QT.Lang.get("settings", "trans_infotext2") + '</li><li>' + QT.Lang.get("settings", "trans_infotext3") + '</li><li>' + QT.Lang.get("settings", "trans_infotext4") + '</li></ul><div style="margin-top:30px"><b>' + QT.Lang.get("settings", "credits") + ':</b><br/><ul style="list-style:square outside;padding-left: 13px">';
				$.each(q_translations, function (a, b) {
					HTML_tab2 += '<li>' + a + ': ' + b + '</li>';
				});
				HTML_tab2 += '</ul></div></div>';
				HTML_tab2 += '</div>';
				HTML_tab2 += QT.Functions.helper.grepo_btn("qmenu_einstellungen_sendmail", QT.Lang.get("settings", "send"))[0].outerHTML;
				HTML_tab2 += '<div id="qtajaxloader" style="width:100%; height:100%; display:none; position:absolute; z-index:1000; top:0; left:0; background: url(http://gpde.innogamescdn.com/images/game/ajax-loader.gif) 50% 50% no-repeat;"></div>';
				return HTML_tab2;
			}
			function tab3() {
				var HTML_tab3 = "";
				var q_donations = [
					["Daniela T. - 1€", "Peter J. - 1€", "André V. - 5€", "Nepomuk P. - 10€"],
					["Michael H. - 1€", "Heiner W. - 5€", "LightShining - 15€", "Hans Hermann S. - 5€"],
					["Leuchtkraft - 10€", "Ann-Katrin R. - 3€", "alexander1128 - 10€", "Martin P. - 10€"],
					[" Rolf M. - 5€", "David W. - 5€", "Omega78 - 25€", "Helga S. - 1€"],
					["Falk T. - 5€", "Christian B. - 1€", "Christian P. - 25€", "Maik S. - 2€"],
					["Dennis B. - 1€", "Sinnaman - 15€", "Marcel N. - 10€", "Edith M. - 10€"],
					["Nepomuk P. - 50€", "Kevin T. - 5€", "Thomas R. - 10€", "Claines C. C. - 3€"],
					["Carsten R. - 5€", "Nick K. - 0,74€", "Eduard R. - 3€"]
				];
				HTML_tab3 += grepoGameBorder + QT.Lang.get("settings", "info") + "</div>";
				HTML_tab3 += '<div id="info_content" class="contentDiv" style="padding:5px 10px; overflow: auto; height:396px">';
				HTML_tab3 += '<table width="100%" cellspacing="0" border="0"><tbody><tr><td width="33%"><a href="http://adf.ly/AAMwY" target="_blank">Quack Toolsammlung ' + QT.Settings.values.script_version + '</a><br />';
				HTML_tab3 += '<small><a href="' + QT.Links.quacktools + '" target="_blank">Direktlink</a> | <a href="' + QT.Lang.get("meta", "changelog") + '" target="_blank">Changelog</a> | <a href="https://github.com/Quackmaster/Grepolis-QT" target="_blank">Github</a></small><br />';
				HTML_tab3 += '<p><iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fgrepolisqt&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe></p>';
				HTML_tab3 += '<p><b>' + QT.Lang.get("settings", "contact") + ':</b><br />E-Mail: <a href="mailto:Quackmaster@web.de">Quackmaster@web.de</a><br />Forum: <a target="_blank" href="' + QT.Lang.get("meta", "forumlink_addfree") + '">Grepolis-Forum</a><br />Website: <a target="_blank" href="' + QT.Links.grepolisqt_main + '">www.grepolisqt.de</a><br />Facebook: <a target="_blank" href="' + QT.Links.grepolisqt_facebook + '">Grepolis QT</a></p></td>';
				HTML_tab3 += '<td width="33%" style="text-align:center">' + QT.Lang.get("meta", "donation_btn") + '</td>';
				HTML_tab3 += '<td width="33%" style="text-align:right"><img style="margin-right: -10px" src="http://s7.directupload.net/images/140711/bl938hld.png"></td></tr></tbody></table>';
				HTML_tab3 += '<div style="text-align: justify"><p />' + QT.Lang.get("settings", "prologue") + '</div>';
				HTML_tab3 += '<p /><b>' + QT.Lang.get("settings", "donations") + ':</b><table width="100%" cellspacing="0" border="0"><tbody>';
				$.each(q_donations, function (a, b) {
					HTML_tab3 += '<tr>';
					$.each(b, function (d, e) {
						HTML_tab3 += '<td>' + e + '</td>';
					});
					HTML_tab3 += '</tr>'
				});
				HTML_tab3 += '</tbody></table>';
				HTML_tab3 += '<p /><small>' + QT.Lang.get("settings", "ingame_name") + '</small>';
				HTML_tab3 += '<p /><a style="padding-bottom: 10px" href="http://adf.ly/?id=2057648" target="_blank">' + QT.Lang.get("settings", "adfly") + '</a>';
				HTML_tab3 += '</div></div>';
				return HTML_tab3;
			}
			function handle_and_style() {
				$("#qmenu_einstellungen_sendmail").css({
					"margin-left" : "1px"
				});
				$("#qmenu_einstellungen_sendmail").click(function () {
					if ($("#trans_lang").length && !$.trim($("#trans_lang").val())) {
						HumanMessage.error(QT.Lang.get("settings", "enter_lang_name"));
						return;
					} else if ($("#langdiv").val() === QT.Lang.get("settings", "info")) {
						HumanMessage.error(QT.Lang.get("settings", "choose_lang"));
						return;
					} else if ($("#trans_content .toSend").length === 0) {
						HumanMessage.error(QT.Lang.get("settings", "no_translation"));
						return;
					}
					hOpenWindow.showConfirmDialog('', QT.Lang.get("settings", "trans_sure"), function () {
						$("#qtajaxloader").css({
							"display" : "block"
						});
						var trans_HTML_send = pName + "<br/>" + sID + "<br/>" + wID + "<p/>";
						$("#trans_content > DIV").each(function (i) {
							if ($(".toSend", this).length != 0) {
								trans_HTML_send += "<b>" + $("SPAN", this).text() + " : {</b><br/>";
								$(".toSend", this).each(function (index) {
									trans_HTML_send += $(this).data("name") + " : '" + $("td:last textarea", this).val() + "',<br/>";
								});
								trans_HTML_send += "},<br/>";
							}
						});
						var xhr = $.ajax({
								type : 'POST',
								url : "https://mandrillapp.com/api/1.0/messages/send.json",
								dataType : 'json',
								data : {
									key : 'Q1FnSR3v9I0K07yUvgCUgw',
									message : {
										html : trans_HTML_send,
										subject : 'Quack Toolsammlung Translation ' + $("#langdiv").val(),
										from_email : "QuackToolsammlung@mail.com",
										to : [{
												"email" : "Quackmaster@web.de",
											}
										]
									}
								}
							});
						xhr.done(function (data) {
							$("#qtajaxloader").css({
								"display" : "none"
							});
							HumanMessage.success(QT.Lang.get("settings", "trans_success"));
						});
						xhr.fail(function (jqXHR, textStatus, errorThrown) {
							$("#qtajaxloader").css({
								"display" : "none"
							});
							HumanMessage.error(QT.Lang.get("settings", "trans_fail"));
						});
					});
				});
				$(".qbox").click(function () {
					$(this).toggleClass("checked");
				});
				$("#qmenu_einstellungen_safe_BTN").css({
					"float" : "right",
					"margin-right" : "1px"
				}).click(function () {
					var valuesToSave = {};
					$(".qbox").each(function (index) {
						if (!$(this).hasClass("checked")) {
							valuesToSave[this.id] = false;
						}
					});
					QT.Settings.save_all(valuesToSave);
				});
				$("#qmenu_einstellungen_reset_BTN").css({
					"float" : "left",
					"margin-left" : "1px"
				}).click(function () {
					hOpenWindow.showConfirmDialog('', QT.Lang.get("settings", "text19"), function () {
						QT.Settings.delete_all();
					});
				});
				$(".contentDiv > DIV:last-child").css({
					"margin-bottom" : "5px"
				});
				$("#langdiv").change(function () {
					var lang_tab2 = $(this).val().toLowerCase();
					var langHTML_tab2 = "";
					if ($(this).val() === QT.Lang.get("settings", "info")) {
						wnd.setContent(inhalte.qset_tab2);
						handle_and_style();
						return;
					} else if ($(this).val() === QT.Lang.get("settings", "add_lang")) {
						langHTML_tab2 += '<div style="margin-top: 5px; padding: 5px; border: 1px solid #B48F45"><span><b>' + QT.Lang.get("settings", "language") + '</b></span><br /><table width="100%" cellspacing="1" border="0"><tbody>';
						langHTML_tab2 += '<tr><td style="width:50%"><div style="max-height:150px; overflow:auto">' + QT.Lang.get("settings", "name") + '</div></td>';
						langHTML_tab2 += '<td style="width:50%"><textarea id="trans_lang"></textarea></td>';
						langHTML_tab2 += '</tr></tbody></table></div>';
					}
					$.each(QT.Lang.en, function (a, b) {
						if (a != "meta") {
							langHTML_tab2 += '<div style="margin-top: 5px; padding: 5px; border: 1px solid #B48F45"><span><b>' + a + '</b></span><br /><table width="100%" cellspacing="1" border="0"><tbody>';
							$.each(b, function (c, d) {
								langHTML_tab2 += '<tr data-name="' + c + '">';
								langHTML_tab2 += '<td style="width:50%"><div style="max-height:150px; overflow:auto">' + d + '</div></td>';
								langHTML_tab2 += (QT.Lang[lang_tab2] != undefined && QT.Lang[lang_tab2][a] != undefined && QT.Lang[lang_tab2][a][c] != undefined) ? '<td style="width:50%"><textarea>' + QT.Lang[lang_tab2][a][c] + '</textarea></td>' : '<td style="width:50%"><textarea>' + QT.Lang.en[a][c] + '</textarea></td>';
								langHTML_tab2 += '</tr>';
							});
							langHTML_tab2 += '</tbody></table></div>';
						}
					});
					$("#trans_content").html(langHTML_tab2);
					$("#trans_content td").css({
						"width" : "50%",
						"border" : "1px solid transparent",
					});
					$("#trans_content textarea").css({
						"height" : "18px",
						"width" : "99%",
						"resize" : "vertical",
						"margin" : "0",
						"padding" : "0"
					});
					$("#trans_content textarea").on("change", function () {
						$(this).parent().css({
							"border" : "1px solid green"
						});
						$(this).parent().parent().addClass("toSend");
						$(this).val($(this).val());
					});
					$(".contentDiv div:last-child").css({
						"margin-bottom" : "5px"
					});
				});
				/* Implement Check Update Button later
				<a id="qtUpdate_check" class="down_big reload" href="#" style="float:right;margin-top:4px"></a>
				$("#qtUpdate_check").click(function () {
					QT.Updater.hideNotice();
					QT.Updater.forceCheck();
				});
				$('#qtUpdate_check').mousePopup(new MousePopup(QT.Lang.get("settings", "update_check")));*/
			}
			var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_SCRIPTMANAGER) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_SCRIPTMANAGER);
			wnd.setTitle(QT.Lang.get("qtoolbox", "settings"));
			wnd.setContent(inhalte.qset_tab1);
			if ($("#qmenu_settings_tabs").length === 0) {
				wnd.getJQElement().append('<div class="menu_wrapper minimize closable" style="left: 1px; right: 33px"><ul id="qmenu_settings_tabs" class="menu_inner">' + QT.Functions.helper.grepo_submenu("qset_tab3", QT.Lang.get("settings", "info"))[0].outerHTML + QT.Functions.helper.grepo_submenu("qset_tab2", QT.Lang.get("settings", "translations"))[0].outerHTML + QT.Functions.helper.grepo_submenu("qset_tab1", QT.Lang.get("settings", "settings"))[0].outerHTML + '</ul></div>');
			}
			$("#qmenu_settings_tabs li a").removeClass("active");
			$("#qset_tab1").addClass("active");
			handle_and_style();
			$("#qmenu_settings_tabs li a").click(function () {
				$("#qmenu_settings_tabs li a").removeClass("active");
				$(this).addClass("active");
				wnd.setContent(inhalte[this.id]);
				handle_and_style();
			});
		},
		selectunitshelper : function () {
			var scriptEl = document.createElement("script");
			scriptEl.setAttribute('type', 'text/javascript');
			scriptEl.appendChild(document.createTextNode("	var gt_db_debugger=false;	var gt_db_content=new Array();	var gt_db_MaxContentLength=14;	function gt_db_FormatTime(t)	{		var h=t.getHours();		if (h<10) h='0'+h;		var m=t.getMinutes();		if (m<10) m='0'+m;		var s=t.getSeconds();		if (s<10) s='0'+s;		return h+':'+m+':'+s;	};	function gt_db_RefreshContent()	{		if (!gt_db_debugger) return;		var gt_wnd;		gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);		if (!gt_wnd)		{			Layout.wnd.Create(Layout.wnd.TYPE_CUSTOM, 'G.Tio Tools Console');			gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);		}		if (gt_db_content.length==gt_db_MaxContentLength)		{			gt_db_content.shift();		}		var gt_temp_content='';		for (var i=0; i<gt_db_content.length; i++)		{			gt_temp_content=gt_temp_content+gt_db_content[i];		}		gt_wnd.setContent(gt_temp_content);	}	function gt_db_Debug(message)	{		var now=new Date();		gt_db_content.push(gt_db_FormatTime(now)+' '+message+'<br>');		gt_db_RefreshContent();	};	(function(){		gt_db_content.push('Tools startet...<br>');		window.setTimeout(gt_db_RefreshContent, 3000);	})();	"));
			document.body.appendChild(scriptEl);

			var scriptEl = document.createElement("script");
			scriptEl.setAttribute('type', 'text/javascript');
			scriptEl.appendChild(document.createTextNode("	function gt_st_ajaxComplete(e, xhr, settings)	{		var url = settings.url.split('?'); var action = url[0].substr(5) + '/' + url[1].split(/&/)[1].substr(7);		if (action=='/town_info/support' || action=='/town_info/attack')		{			gt_bl_initWnd();		}			};	$(document).ajaxComplete(gt_st_ajaxComplete);"));
			document.body.appendChild(scriptEl);

			var scriptEl = document.createElement("script");
			scriptEl.setAttribute('type', 'text/javascript');
			scriptEl.appendChild(document.createTextNode("	var gt_bl_unitPopulation={sword:1,slinger:1,archer:1,hoplite:1,rider:3,chariot:4,catapult:15,minotaur:30,zyklop:40,medusa:18,cerberus:30,fury:55,centaur:12};	var gt_bl_groundUnits=new Array('sword','slinger','archer','hoplite','rider','chariot','catapult','minotaur','zyklop','medusa','cerberus','fury','centaur','calydonian_boar','godsent');	function gt_bl_process(wndid)	{		var wnd=GPWindowMgr.GetByID(wndid);		if (!wnd)			return;		var handler=wnd.getHandler();		if (!handler)			return;		var units=new Array();		var item;		for (var i=0; i<gt_bl_groundUnits.length; i++)		{			if (handler.data.units[gt_bl_groundUnits[i]])			{				item={name:gt_bl_groundUnits[i], count:handler.data.units[gt_bl_groundUnits[i]].count, population:handler.data.units[gt_bl_groundUnits[i]].population};				units.push(item);			}		}		if (handler.data.researches && handler.data.researches.berth)			var berth=handler.data.researches.berth;		else			var berth=0;		var totalCap=handler.data.units.big_transporter.count*(handler.data.units.big_transporter.capacity+berth)+handler.data.units.small_transporter.count*(handler.data.units.small_transporter.capacity+berth);						units.sort(function(a,b){			return b.population-a.population;		});		for (i=0; i<units.length; i++)			gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);		for (i=0; i<units.length; i++)			if (units[i].count==0)			{				units.splice(i,1);				i=i-1;			};		gt_db_Debug('---');		for (i=0; i<units.length; i++)			gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);								var restCap=totalCap;		var sendUnits=new Array();		for (i=0; i<units.length; i++)		{			item={name:units[i].name, count:0};			sendUnits[units[i].name]=item;		};		for (j=0; j<gt_bl_groundUnits.length; j++)		{			if (sendUnits[gt_bl_groundUnits[j]])				gt_db_Debug(sendUnits[gt_bl_groundUnits[j]].name+' '+sendUnits[gt_bl_groundUnits[j]].count);		}						var hasSent;		k=0;		while (units.length>0)		{			hasSent=false;			k=k+1;			for (i=0; i<units.length; i++)			{				if (units[i].population<=restCap)				{					hasSent=true;					units[i].count=units[i].count-1;					sendUnits[units[i].name].count=sendUnits[units[i].name].count+1;					restCap=restCap-units[i].population;				}			}			for (i=0; i<units.length; i++)				if (units[i].count==0)				{					units.splice(i,1);					i=i-1;				};			if (!hasSent)			{				gt_db_Debug('Abbruch nach '+k+' loops');				break;			}		}		gt_db_Debug('nach '+k+'---- rest='+restCap);		for (i=0; i<gt_bl_groundUnits.length; i++)		{			if (sendUnits[gt_bl_groundUnits[i]])				gt_db_Debug(sendUnits[gt_bl_groundUnits[i]].name+' '+sendUnits[gt_bl_groundUnits[i]].count);		}		handler.getUnitInputs().each(function ()		{			if (!sendUnits[this.name])			{				if (handler.data.units[this.name].count>0)					this.value=handler.data.units[this.name].count;				else					this.value='';			}		});		for (i=0; i<gt_bl_groundUnits.length; i++)		{			if (sendUnits[gt_bl_groundUnits[i]])			{				if (sendUnits[gt_bl_groundUnits[i]].count>0)					$('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val(sendUnits[gt_bl_groundUnits[i]].count);				else					$('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val('');			}		}		$('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');	}	function gt_bl_delete(wndid)	{		var wnd=GPWindowMgr.GetByID(wndid);		if (!wnd)			return;		var handler=wnd.getHandler();		if (!handler)			return;		handler.getUnitInputs().each(function ()		{			this.value='';		});		$('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');	}	function gt_bl_initWnd()	{		var wnds=GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);		if (wnds.length==0)		{			return;		}		var testel=$('DIV#gpwnd_'+wndid+' A.gt_balanced');		if (testel.length>0) return;		var wnd=wnds[wnds.length-1];		var wndid=wnd.getID();		var ael=$('DIV#gpwnd_'+wndid+' A.select_all_units');		$(ael).after('&nbsp;|&nbsp;<a class=gt_balanced style=\\\'position:relative; top:3px\\\' href=javascript:gt_bl_process('+wndid+')>" + QT.Lang.get("town_info", "no_overload") + "</a>		&nbsp;|&nbsp;<a style=\\\'position:relative; top:3px\\\' href=javascript:gt_bl_delete('+wndid+')>" + QT.Lang.get("town_info", "delete") + "</a>');	}"));
			document.body.appendChild(scriptEl);
		},
		statsandscripts : function () {
			var grepoGameBorder = '<div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;padding:3px 11px">';
			var grepoGameBorderContainer = '<div class="qsettingsContainer" style="padding:5px 5px 0px 5px; overflow: auto">';
			
			var SAS_HTML = [];
			SAS_HTML[0] = ["Tools", {
					"grepostats" : ["Grepolis Stats", "http://adf.ly/B7C8k", "Clash Rank", "http://www.clashrank.com/contact", QT.Links.grepostats, "Bietet Statistiken und Übersichten über Spieler, Allianzen, Städte und vielem mehr"],
					"grepolisintel" : ["Grepolis Intel", "http://adf.ly/B7D1y", "wansyth", "mailto:wansyth@grepointel.com", QT.Links.grepointel, "Ähnlich wie Grepo Stats, aber mit einigen zusätzlichen Funktionen wie Serverkarten oder Polissuche"],
					"grepolismaps" : ["Grepolis Maps", "http://adf.ly/B7BlJ", "Gehirnpfirsich", "mailto:info@twmaps.org", QT.Links.grepomaps_main, "Kartentool - Weltkarten aller Server"],
					"quo" : ["Quo - Allianz Bashliste", "http://adf.ly/pc8xL", "Maltokor", "http://forum.de.grepolis.com/private.php?do=newpm&u=47548", QT.Links.quo_main, "Alternative zu Grepobash"],
					"grepobash" : ["Grepolis Bashrangliste", "http://adf.ly/B6HBW", "quert", "mailto:support@terenceds.de", QT.Links.grepobash_main, "Allianzinterne Bashrangliste"],
					"polissuche" : ["Polissuche", "http://adf.ly/fGG9b", "tonda", "http://forum.de.grepolis.com/private.php?do=newpm&u=1345", QT.Links.polisssuche_main, "Deutsche Suchfunktion für Städte mit breiter Auswahl von Filteroptionen. Nützlich um Geisterstädte und Inaktive zu finden"],
					"grepofinder" : ["Grepolis Finder", "http://adf.ly/B7D6r", "Ludovic Drolez", "mailto:ludo@drolez.com", QT.Links.grepofinder_main, "Suchen von Städten mit bestimmten Filteroptionen. Nützlich um Geisterstädte und Inaktive zu finden"],
					"grepounitcompare" : ["Grepolis Einheiten Vergleich", "http://adf.ly/B7Cry", "Quackmaster", "http://forum.de.grepolis.com/private.php?do=newpm&u=11342", QT.Links.einheitenvergleich, "Eine Tabelle um die Verteidigungswerte der einzelnen Einheiten in Grepolis miteinander zu vergleichen"],
					"grepoutils" : ["Grepoutils", "http://adf.ly/B7Cgc", "sayunu", "http://forum.pt.grepolis.com/member.php?219-sayunu", QT.Links.grepoutils, "Bietet einige Tools für Grepolis"],
					"grepolisrevobericht" : ["Grepolis Revo Bericht", "http://adf.ly/cY3Ww", "znyde", "http://forum.de.grepolis.com/private.php?do=newpm&u=47082", QT.Links.grepolisrevobericht, "Formatiert eure Deffanfragen anschaulich und übersichtlich für das Forum"],
					"grepoforen" : ["GrepoForen", "http://adf.ly/cY4st", "schüri", "http://forum.de.grepolis.com/private.php?do=newpm&u=1559", QT.Links.grepoforen, "Kostenloses Grepo-phpBB-Forum, dass im Vergleich zu einem normalen Forum über viele nützliche Zusatzfunktionen für Grepolis verfügt."],
					"abakus" : ["Abakus - Der Grepolis Rechner", "http://adf.ly/B7CyQ", "Aerials", "http://forum.de.grepolis.com/private.php?do=newpm&u=781", QT.Links.abakus, "Rechner und Planer rund um Grepolis zum Download auf den Computer"],
					"grepotool" : ["Grepotool", "http://adf.ly/eAYD9", ".Pete.", "http://forum.de.grepolis.com/private.php?do=newpm&u=38433", QT.Links.grepotool, "<ul><li>Frei scroll- und zoombare Grepo-Karte einer jeden Welt</li><li>Spieler oder Allianzen können farblich markiert werden (politische Karte)</li><li>Man kann zu jeder Stadt eintragen, welche Einheiten drinstehen</li><li>Es lassen sich verschiedene Listen von Städten anlegen</li><li>uvm.</li></ul>"],
					"revoformatierer" : ["Grepolis Revolte-Bericht-Formatierer", "http://adf.ly/pc9Vp", "zynde", "http://forum.de.grepolis.com/member.php?47082-znyde", QT.Links.revoformatierer, "Formatiert Revolte Berichte für das Allianzforum"],
					"youscreen" : ["YouScreen", "http://adf.ly/BKCfU", "Lukas Ruschitzka", "mailto:webmaster@youscreen.de", QT.Links.youscreen, "Screenshot Tool - mit der Druck-Taste einen Screenshot erstellen und direkt ins Internet hochladen (vorherige Bearbeitung möglich)"],
				}
			];
			SAS_HTML[1] = ["Skripte", {
					"quacktools" : ["Quack Toolsammlung", "http://adf.ly/AAMwY", "Quackmaster", "http://forum.de.grepolis.com/private.php?do=newpm&u=11342", QT.Links.quacktools, "<ul><li>Grepo Stats Button in der Stadtinfo, Spielerinfo und Allianzinfo</li><li>Überschüssiges Silber bis 15k wird in das Formfeld in der Höhle vorab eingetragen. Im Formfeld können Beträge mit Enter bestätigt werden</li><li>In Berichten und im Simulator werden Truppenverluste in Rohstoffe/Gunst/BP umgerechnet</li><li>Anzeige von Punkten für bestimmte Gebäude im Senat</li><li>Buttonleiste mit Links zu allen wichtigen Toolseiten</li><li>Verschieden Ansichtsmöglichkeiten</li><li>BB Code Ausgabe der stationierten Truppen in und außerhalb einer Stadt für das Allianzforum oder Nachrichten</li><li>BB Code Ausgabe aller Gebäudestufen einer Stadt</li><li>Kein Überladen der Schiffe im Angriffs-/Unterstützungsfenster</li><li>Erweiterung der Kulturübersicht (G.Tio2.0Tools)</li><li>Erweiterung der Befehlsübersicht (Anzahl von Bewegungen wird angezeigt)</li><li>Hotkeys zu verschiedenen Funktionen</li><li>Übersicht über sämtliche erlaubten Statistiken und Skripte</li><li>Transportrechner</li><li>Online Timer</li><li>Google Docs Implementation</li><li>Berichte werden farblich markiert und können nach Filtern ausgewählt werden</li><li>Die Breite des Forums kann nach der Anzahl der Menüpunkte erhöht werden</li><li>Anzeige und Funktionen des Skriptes können an-/abgeschaltet werden</li><li>Questsymbole und Questpfeil können verschoben oder versteckt werden</li><li>Button in der Inselübersicht um eine Nachricht an alle Spieler auf der Insel schicken zu können</li><li>Auswahlliste aller Ordner im Berichtefenster</li><li>Beiträge im Forum können selektiert und gelöscht werden</li><li>BB-Code Button neben dem Stadtnamen</li><li>Sortierfunktion in der Höhlenübersicht</li><li>Akademieplaner</li><li>Gewählte Farmoption in der Bauerndörferübersicht (Kaptitän) wird sich gemerkt und automatisch ausgewählt</li></ul>"],
					"grc" : ["Grepolis Report Converter", "http://adf.ly/MBEgz", "Potusek", "mailto:grepolis@potusek.eu", QT.Links.grc, "<ul><li>Kann so gut wie alles in BB-Code umwandeln</li><li>Zugriff auf Spieler-Statistiken</li><li>Anzeige der Verluste (in der Mauer)</li><li>Emoticons in Nachrichten und Beiträgen im Forum</li><li>Zeitanzeige wann ein Zauber wieder verwendet werden kann</li><li>Mehrzeilige Ansicht der Tabs im Allianz Forum</li></ul>"],
					"diotools" : ["DIO-Tools", "http://adf.ly/cY7c1", "Diony", "http://forum.de.grepolis.com/private.php?do=newpm&u=10548", QT.Links.diotools, "<ul><li>Eigens erstellte Grepo-Smileys</li><li>Biremenzähler</li><li>Einheitenstärke DEF/OFF im Einheitenmenü und Auswahl der Einheitentypen</li><li>Einheitenstärke DEF & Bevölkerung in der Kaserne</li><li>Transporterkapazität</li><li>Verkürzte Laufzeit im ATT/UT-Fenster</li><li>Diverse Erweiterungen des Handelsfensters</li><li>Diverse Erweiterungen für Weltwunder</li><li>Angriffs- Unterstützungs-Zähler im Eroberungsfenster</li><li>Diverse GUI-Optimierungen</li></ul>"],
					"playerprofile" : ["Zurück-Button für Spielerprofile", "http://adf.ly/Djc2I", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.playerprofilescript, "Merkt sich geöffnete Spielerprofile die im Spielerprofilfenster vor und zurück geblättert werden können. Legt außerdem eine Chronik an, welche eine Übersicht aller geöffneten Spielerprofile bietet"],
					"transportrechner_menidan" : ["Transportrechner", "http://adf.ly/cY7nh", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.transportrechner_menidan, "Ein weiterer Transportrechner"],
					"zeitrechner" : ["Zeitrechner", "http://adf.ly/cY7JP", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.zeitrechner, "Rechnet die Summe bzw. Differenz von zwei Uhrzeiten aus"],
					"attackwarner" : ["Angriffswarner", "http://adf.ly/cY7c0", "gordon1982", "http://forum.de.grepolis.com/private.php?do=newpm&u=41281", QT.Links.attackwarner, "Spielt einen Warnton ab, wenn man angegriffen wird"],
					"bauerndorfalarm" : ["Bauerndorf Alarm", "http://adf.ly/cY7c2", "Kapsonfire", "http://forum.de.grepolis.com/private.php?do=newpm&u=46026", QT.Links.bauerndorfalarm, "Das Skript gibt Bescheid, wenn im aktuellen Sichtbereich Bauerndörfer zum farmen verfügbar sind"],
					"grepotownlist" : ["Grepolis Stats Townlist", "http://adf.ly/AARtm", "GTeauDFAdGTio", "http://forum.de.grepolis.com/private.php?do=newpm&u=8531", QT.Links.grepotownslist, "Zusatzfunktionen für die Grepolis Stats Seite. Ermöglicht die Umwandlung der Städte eines Spielers in BB-Code"],
					"gs_eroberungsstatistiken" : ["Grepolis Stats Eroberungsstatistiken", "http://adf.ly/rGbkm", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.gs_eroberungsstatistiken, "Erstellt Statistiken für die Eroberungen von Allianzen"],
				}
			];
			
			var inhalt = "";

			inhalt += '<div id="stats_scripts_content" class="contentDiv" style="padding:0 5px; overflow: auto; height:434px">';
			
			$.each(SAS_HTML, function (a, b) {
				inhalt += '<div id="' + b[0] + '">' + grepoGameBorder + b[0] + '<a class="forum_export" style="float:right" href="#"><img src="http://s14.directupload.net/images/140124/8tzken7v.png" style="margin-top: -2px; margin-left: 11px;" /></a>' + "</div>" + grepoGameBorderContainer;
				$.each(b[1], function (c, d) {
					inhalt += '<a href="' + d[1] + '" target="_blank">' + d[0] + '</a>';
					inhalt += '<small> von <a href="' + d[3] + '" target="_blank">' + d[2] + '</a></small><br />';
					inhalt += '<small><a href="' + d[4] + '" target="_blank">Direktlink</a></small><br />';
					inhalt += d[5] + '<p />';
				});
				inhalt += "</div></div></div>";
			});

			inhalt += '</div>';

			var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_STATSANDSCRIPTS) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_STATSANDSCRIPTS);
			wnd.setTitle(QT.Lang.get("qtoolbox", "stats_scripts"));
			wnd.setContent(inhalt);
			var mo_Export = "Liste als BB-Code für das Forum";
			$('.forum_export').mousePopup(new MousePopup(mo_Export));
			var expRahmen_a = "<div class='inner_box'><div class='game_border'><div class='game_border_top'></div><div class='game_border_bottom'></div><div class='game_border_left'></div><div class='game_border_right'></div><div class='game_border_corner corner1'></div><div class='game_border_corner corner2'></div><div class='game_border_corner corner3'></div><div class='game_border_corner corner4'></div><div class='game_header bold' style='height:18px;'><div style='float:left; padding-right:10px;'></div>";
			var expRahmen_b = "</div><textarea id='expTextarea' style=\"height: 228px; width: 685px;\">";
			var expRahmen_c = "</textarea></div><div style='overflow-x: hidden; padding-left: 5px; position: relative;'></div></div></div>";
			var expTitel = "Copy & Paste";
			$('#Tools .forum_export').click(function () {
				var expInhalt_Stats = "[quote][font=sansserif][center][size=20][b]Tools:[/b][/size][/center][/font][/quote]\n[quote][font=sansserif]";
				$.each(SAS_HTML[0][1], function (a, b) {
					expInhalt_Stats += '[size=10][url=' + b[1] + ']' + b[0] + '[/url][/size]';
					expInhalt_Stats += '[size=6] von [url=' + b[3] + ']' + b[2] + '[/url]\n[url=' + b[4] + ']Direktlink[/url][/size]\n';
					expInhalt_Stats += b[5] + '\n\n';
				});
				expInhalt_Stats += "[/font][/quote]";
				var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_BBCODE) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_BBCODE);
				wnd.setTitle(QT.Lang.get("qtoolbox", "bb_codes") + " - Tools");
				wnd.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Stats + expRahmen_c);
				$("#expTextarea").focus(function () {
					var that = this;
					setTimeout(function () {
						$(that).select();
					}, 10);
				});
			});
			$('#Skripte .forum_export').click(function () {
				var expInhalt_Skripte = "[quote][font=sansserif][center][size=20][b]Skripte:[/b][/size]\nAdd-ons installieren um die Skripte zum laufen zu bringen:\n[b]Firefox:[/b] [url=https://addons.mozilla.org/de/firefox/addon/greasemonkey/]Greasemonkey[/url] ; [b]Chrome:[/b] [url=https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo]Tampermonkey[/url][/center][/font][/quote]\n[quote][font=sansserif]";
				$.each(SAS_HTML[1][1], function (a, b) {
					expInhalt_Skripte += '[size=10][url=' + b[1] + ']' + b[0] + '[/url][/size]';
					expInhalt_Skripte += '[size=6] von [url=' + b[3] + ']' + b[2] + '[/url]\n[url=' + b[4] + ']Direktlink[/url][/size]\n';
					if (b[5].indexOf("<") != -1) {
						var text_sanatize = b[5].replace(/<\li>/ig, '- ').replace(/<\/li>/ig, '\n').replace(/(<([^>]+)>)/ig, "");
						expInhalt_Skripte += text_sanatize + '\n';
					} else {
						expInhalt_Skripte += b[5] + '\n\n';
					}
				});
				expInhalt_Skripte += "[/font][/quote]";
				var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_BBCODE) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_BBCODE);
				wnd.setTitle(QT.Lang.get("qtoolbox", "bb_codes") + " - Skripte");
				wnd.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Skripte + expRahmen_c);
				$("#expTextarea").focus(function () {
					var that = this;
					setTimeout(function () {
						$(that).select();
					}, 10);
				});
			});
		},
		tb_activitiesExtra : function () {
			$("#toolbar_activity_recruits_list").hover(
				function () {
				if ($("#qplusmenuRecruits").length == 0) {
					$("#toolbar_activity_recruits_list").append('<div id="qplusmenuRecruits" class="qplusmenu"><div id="qplusdraghandleRecruits" class="qplusdraghandle"></div><a class="qplusback" href="#"></a></div>');
					$('#qplusmenuRecruits .qplusback').click(function () {
						qplus_destroy("qplusmenuRecruits");
					});
				}
			}, function () {
				$('#qplusmenuRecruits').remove();
			});
			$("#toolbar_activity_commands_list").hover(
				function () {
				if ($("#qplusmenuCommands").length == 0) {
					$("#toolbar_activity_commands_list").append('<div id="qplusmenuCommands" class="qplusmenu"><div id="qplusdraghandleCommands" class="qplusdraghandle"></div><a class="qplusback" href="#"></a></div>');
					$('#qplusmenuCommands .qplusback').click(function () {
						qplus_destroy("qplusmenuCommands");
					});
				}
			}, function () {
				$('#qplusmenuCommands').remove();
			});
			$("#toolbar_activity_trades_list").hover(
				function () {
				if ($("#qplusmenuTrades").length == 0) {
					$("#toolbar_activity_trades_list").append('<div id="qplusmenuTrades" class="qplusmenu"><div id="qplusdraghandleTrades" class="qplusdraghandle"></div><a class="qplusback" href="#"></a></div>');
					$('#qplusmenuTrades .qplusback').click(function () {
						qplus_destroy("qplusmenuTrades");
					});
				}
			}, function () {
				$('#qplusmenuTrades').remove();
			});

			$('<style id="qplusmenustyle" type="text/css">\
																									.displayImp {display: block !important}\
																									.qplusmenu {margin:6px 22px 2px 5px;height:11px;display:block;position:relative}\
																									.qplusdraghandle {width:100%;height:11px;position:absolute;background:url(http://s14.directupload.net/images/131001/7guz6abs.png)}\
																									.qplusback {right:-18px;margin-top:-1px;width:16px;height:12px;position:absolute;background:url(http://s1.directupload.net/images/131001/u6le7bdw.png)}\
																									</style>').appendTo('head');

			$('#toolbar_activity_recruits_list').draggable({
				cursor : "move",
				handle : ".qplusdraghandle",
				start : function () {
					$("#qplusmenuRecruitsSTYLE").remove();
					$('#toolbar_activity_recruits_list').addClass("displayImp");
				},
				stop : function () {
					var qposition = $('#toolbar_activity_recruits_list').position();
					$('<style id="qplusmenuRecruitsSTYLE" type="text/css">#toolbar_activity_recruits_list {left: ' + qposition.left + 'px !important;top: ' + qposition.top + 'px !important}</style>').appendTo('head');
				}
			});
			$('#toolbar_activity_commands_list').draggable({
				cursor : "move",
				handle : ".qplusdraghandle",
				start : function () {
					$('#toolbar_activity_commands, #toolbar_activity_commands_list').off("mouseout");
					$("#qplusmenuCommandsSTYLE").remove();
					$('#toolbar_activity_commands_list').addClass("displayImp");

				},
				stop : function () {
					var qposition = $('#toolbar_activity_commands_list').position();
					$('<style id="qplusmenuCommandsSTYLE" type="text/css">#toolbar_activity_commands_list {left: ' + qposition.left + 'px !important;top: ' + qposition.top + 'px !important}</style>').appendTo('head');
				}
			});
			$('#toolbar_activity_trades_list').draggable({
				cursor : "move",
				handle : ".qplusdraghandle",
				start : function () {
					$("#qplusmenuTradesSTYLE").remove();
					$('#toolbar_activity_trades_list').addClass("displayImp");
				},
				stop : function () {
					var qposition = $('#toolbar_activity_trades_list').position();
					$('<style id="qplusmenuTradesSTYLE" type="text/css">#toolbar_activity_trades_list {left: ' + qposition.left + 'px !important;top: ' + qposition.top + 'px !important}</style>').appendTo('head');
				}
			});

			function qplus_destroy(JQselector) {
				if (JQselector == "qplusmenuCommands") {
					$('#toolbar_activity_commands_list').hide();
					$('#toolbar_activity_commands_list').on("mouseleave", function () {
						$('#toolbar_activity_commands_list').hide();
					});
					$('#toolbar_activity_recruits, #toolbar_activity_trades').on("mouseenter", function () {
						$('#toolbar_activity_commands_list').hide();
					});
				}
				$("#" + JQselector).parent().removeClass("displayImp");
				$("#" + JQselector + "STYLE").remove();
			}

		},
		townGSButton : function () {
			var wndArray = GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);
			for (var e in wndArray) {
				if (wndArray.hasOwnProperty(e)) {
					var c = wndArray[e].getID();
					var d = $("DIV#gpwnd_" + c + " .qt_gsbutton");
					if (!$("DIV#gpwnd_" + c + " DIV#towninfo_towninfo A.gp_player_link").length > 0 || d.length > 0)
						continue;
					var e = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo A.gp_player_link").attr("href");
					var f = e.split(/#/);
					var g = $.parseJSON(atob(f[1] || f[0]));
					var h = window.location.host.replace(/.grepolis.com.*$/, "");
					var i = h.replace(/\d+/, "");
					var j = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_right");
					$(j[1]).append('<a class="qt_gsbutton" target="_blank" href="http://' + i + ".grepostats.com/world/" + h + "/player/" + g.id + '"><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a>');
					$(j[1]).css("width", "+=25px");
					if (!$('DIV#gpwnd_' + c + ' a[onclick^="Layout.allianceProfile"]').length > 0)
						continue;
					var k = $('DIV#gpwnd_' + c + ' a[onclick^="Layout.allianceProfile"]').attr("onclick").replace(")", "").split(",")[1];
					var l = $('DIV#gpwnd_' + c + ' a[onclick^="Layout.allianceProfile"]').parent().find(".list_item_right");
					l.prepend('<span class="qt_gsbutton"><a class="qt_gsbutton" target="_blank" href="http://' + i + ".grepostats.com/world/" + h + "/alliance/" + k + '"><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a></span>');
					l.css("width", "60px")

				}
			}
		},
		townInactivity : function () {
			var wndArray = GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);
			for (var e in wndArray) {
				if (wndArray.hasOwnProperty(e)) {
					var c = wndArray[e].getID();

					var d = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_left A.qt_activity")
						if (!$("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_left A.gp_player_link").length > 0 || d.length > 0)
							continue;
						var e = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_left A.gp_player_link").attr("href");
					var f = e.split(/#/);
					var g = $.parseJSON(atob(f[1] || f[0]));
					var currentTownXY = QT.Functions.Inactivity.Filter.coordinates();
					$("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_left").prepend(QT.Functions.Inactivity.addDisplay("margin:2px 3px 0 0;", 'http://polissuche.marco93.de/' + wID + '.html?filter=player_id:' + g.id + currentTownXY + ''));
					var JQelement = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_left A.qt_activity");

					if (QT.Functions.Inactivity.isCached(g.id)) {
						var inactive_days_cached = QT.Functions.Inactivity.cache[g.id];
						QT.Functions.Inactivity.changeDisplay(JQelement, inactive_days_cached);
						continue;
					}

					QT.Functions.Inactivity.getData(g.id).done(function (data) {
						QT.Functions.Inactivity.changeDisplay(JQelement, QT.Functions.Inactivity.cache[g.id]);
					});

				}
			}
		},
		townTradeImprovement : function () { //name
			var wndArray = GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);
			for (var e in wndArray) {
				if (wndArray.hasOwnProperty(e)) {
					var wndID = wndArray[e].getID();
					if ($("DIV#gpwnd_" + wndID + " .q_needed").length > 0 || $("DIV#gpwnd_" + wndID + " .town-capacity-indicator").length == 0)
						continue;

					$("DIV#gpwnd_" + wndID + " div.amounts").each(function () {
						var rescurrent = $(this).find("span.curr").html();
						var ressended = ($(this).find("span.curr2").html() == "") ? 0 : parseInt($(this).find("span.curr2").html().substring(3));
						var ressending = ($(this).find("span.curr3").html() == "") ? 0 : parseInt($(this).find("span.curr3").html().substring(3));
						var resmaxtown = $(this).find("span.max").html();
						var resneeded = resmaxtown - rescurrent - ressended - ressending;
						$(this).append('<span class="q_needed"> &#9658; ' + resneeded + '</span>');
					});

					function rescalc(mode) {
						var resmaxmarket = parseInt($("DIV#gpwnd_" + wndID + " #big_progressbar .caption .max").html());
						var ressendingNOW = parseInt($("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val());
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(0).select().blur();
						var rescurrmarket = parseInt($("DIV#gpwnd_" + wndID + " #big_progressbar .caption .curr").html());
						var restotalmarket = resmaxmarket - rescurrmarket;
						var resselector = $("DIV#gpwnd_" + wndID + " #town_capacity_" + mode.substring(2));
						var rescurrent = resselector.find("span.curr").html();
						var ressended = (resselector.find("span.curr2").html() == "") ? 0 : parseInt(resselector.find("span.curr2").html().substring(3));
						var ressending = (resselector.find("span.curr3").html() == "") ? 0 : parseInt(resselector.find("span.curr3").html().substring(3));
						var resmaxtown = resselector.find("span.max").html();
						var resneeded = resmaxtown - rescurrent - ressended - ressending;
						var b = (resneeded > restotalmarket) ? restotalmarket : resneeded;
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(b).select().blur();
						var ressendingNOW2 = parseInt($("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val());
						var c = (ressendingNOW == ressendingNOW2) ? 0 : b;
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(c).select().blur();
					}

					function rescalccult(mode) {
						var resmaxmarket = parseInt($("DIV#gpwnd_" + wndID + " #big_progressbar .caption .max").html());
						var ressendingNOW = parseInt($("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val());
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(0).select().blur();
						var rescurrmarket = parseInt($("DIV#gpwnd_" + wndID + " #big_progressbar .caption .curr").html());
						var restotalmarket = resmaxmarket - rescurrmarket;

						var resselector = $("DIV#gpwnd_" + wndID + " #town_capacity_" + mode.substring(2));
						var rescurrent = resselector.find("span.curr").html();
						var ressended = (resselector.find("span.curr2").html() == "") ? 0 : parseInt(resselector.find("span.curr2").html().substring(3));
						var ressending = (resselector.find("span.curr3").html() == "") ? 0 : parseInt(resselector.find("span.curr3").html().substring(3));
						var resmaxtown = resselector.find("span.max").html();
						var resneeded = resmaxtown - rescurrent - ressended - ressending;
						var tradetype = (mode == "q_stone") ? 18000 : 15000;
						var a = tradetype - rescurrent - ressended - ressending;
						var b = (a > restotalmarket) ? restotalmarket : a;
						var c = (b > resneeded) ? resneeded : b;
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(c).select().blur();
						var ressendingNOW2 = parseInt($("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val());
						var d = (ressendingNOW == ressendingNOW2) ? 0 : c;
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(d).select().blur();
					}

					function rescalccultReverse(mode) {
						var resmaxmarket = parseInt($("DIV#gpwnd_" + wndID + " #big_progressbar .caption .max").html());
						var ressendingNOW = parseInt($("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val());
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(0).select().blur();
						var rescurrmarket = parseInt($("DIV#gpwnd_" + wndID + " #big_progressbar .caption .curr").html());
						var restotalmarket = resmaxmarket - rescurrmarket;
						var townrescurrent = $("div#ui_box div.ui_resources_bar div.indicator[data-type='" + mode.substring(2) + "'] div.amount").text();
						var tradetype = (mode == "q_stone") ? 18000 : 15000;
						var a = townrescurrent - tradetype;
						var b = (tradetype > townrescurrent) ? 0 : a;
						var c = (b > restotalmarket) ? restotalmarket : b;
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(c).select().blur();
						var ressendingNOW2 = parseInt($("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val());
						var d = (ressendingNOW == ressendingNOW2) ? 0 : c;
						$("DIV#gpwnd_" + wndID + " #trade_type_" + mode.substring(2)).find("input").val(d).select().blur();
					}

					$("DIV#gpwnd_" + wndID + " #trade_tab").append(
						'<a id="q_wood" class="q_send" style="top:211px" href="#"></a>' +
						'<a id="q_stone" class="q_send" style="top:245px" href="#"></a>' +
						'<a id="q_iron" class="q_send" style="top:279px" href="#"></a>' +
						'<a id="q_wood" class="q_send_cult" style="top:211px" href="#"></a>' +
						'<a id="q_stone" class="q_send_cult" style="top:245px" href="#"></a>' +
						'<a id="q_iron" class="q_send_cult" style="top:279px" href="#"></a>' +
						'<a id="q_wood" class="q_send_cult_reverse" style="top:211px" href="#"></a>' +
						'<a id="q_stone" class="q_send_cult_reverse" style="top:245px" href="#"></a>' +
						'<a id="q_iron" class="q_send_cult_reverse" style="top:279px" href="#"></a>');

					$("DIV#gpwnd_" + wndID + " .q_send").click(function () {
						rescalc(this.id);
					});
					$("DIV#gpwnd_" + wndID + " .q_send_cult").click(function () {
						rescalccult(this.id);
					});
					$("DIV#gpwnd_" + wndID + " .q_send_cult_reverse").click(function () {
						rescalccultReverse(this.id);
					});

				}
			}

			$(".q_send_cult").css({
				"right" : "84px",
				"position" : "absolute",
				"height" : "16px",
				"width" : "22px",
				"background-image" : "url(http://s7.directupload.net/images/130330/d67gpq9g.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px -1px"
			});
			$(".q_send_cult_reverse").css({
				"left" : "105px",
				"position" : "absolute",
				"height" : "16px",
				"width" : "22px",
				"background-image" : "url(http://s7.directupload.net/images/130619/p6jyv8gu.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px -1px"
			});
			$(".q_send").css({
				"right" : "105px",
				"position" : "absolute",
				"height" : "16px",
				"width" : "22px",
				"background-image" : "url(http://s1.directupload.net/images/130330/x2pnbew9.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px -1px"
			});

			$(".q_send, .q_send_cult, .q_send_cult_reverse").hover(
				function () {
				$(this).css({
					"background-position" : "0px -17px"
				});
			},
				function () {
				$(this).css({
					"background-position" : "0px -1px"
				});
			});
		},
		townslist : function () {
			if ($('#town_groups_list a.town_bb').length != 0)
				return;
			$('.content .group_name .name').append('<a class="town_bb" style="position: absolute; display: block; top: 4px; right: 16px;" href="#"><img src="http://s14.directupload.net/images/140124/8tzken7v.png" style="height: 15px; width: 17px;" /></a>');
			$('.town_bb').click(function (e) {
				var towngrp_id = $(this).parent().data('groupid');
				var cities_towngroup = ITowns.town_group_towns.getTowns(towngrp_id);
				var bb_content = "";
				$.each(cities_towngroup, function (key, town) {
					bb_content += "[town]" + town.attributes.town_id + "[/town] (" + town.town_model.attributes.points + ") " + town.town_model.attributes.island_x + "|" + town.town_model.attributes.island_y + "\n";
				});
				var expRahmen_a = "<div class='inner_box'><div class='game_border'><div class='game_border_top'></div><div class='game_border_bottom'></div><div class='game_border_left'></div><div class='game_border_right'></div><div class='game_border_corner corner1'></div><div class='game_border_corner corner2'></div><div class='game_border_corner corner3'></div><div class='game_border_corner corner4'></div><div class='game_header bold' style='height:18px;'><div style='float:left; padding-right:10px;'></div>";
				var expRahmen_b = "</div><textarea id='expTextarea' style=\"height: 228px; width: 685px;\">";
				var expRahmen_c = "</textarea></div><div style='overflow-x: hidden; padding-left: 5px; position: relative;'></div></div></div>";
				var expTitel = "Copy & Paste";
				var wnd = GPWindowMgr.Create(GPWindowMgr.TYPE_QT_BBCODE) || GPWindowMgr.getOpenFirst(GPWindowMgr.TYPE_QT_BBCODE);
				wnd.setTitle(QT.Lang.get("qtoolbox", "bb_codes") + " - " + QT.Lang.get("bbcode", "cities"));
				wnd.setContent(expRahmen_a + expTitel + expRahmen_b + bb_content + expRahmen_c);
				$("#expTextarea").focus(function () {
					var that = this;
					setTimeout(function () {
						$(that).select();
					}, 10);
				});
			});
			$('.town_group_town').hover(function () {
				var townID = $(this).data("townid");
				$(this).append('<div class="jump_town" data-townid="' + townID + '"></div>');
				$(".jump_town")
				.css({
					"display" : "block",
					"top" : "2px",
					"right" : "15px",
					"height" : "16px",
					"width" : "16px",
					"position" : "absolute",
					"background" : "url('http://cdn.grepolis.com/images/game/layout/town_list_btns.png') repeat scroll -32px 0 transparent"
				})
				.click(function (e) {
					e.stopPropagation();
					WMap.mapJump(ITowns.getTown(townID), true);
				}) // MapTiles.focusTown(townID);
				.hover(function () {
					$(this).css({
						"background-position" : "-32px -16px"
					});
				}, function () {
					$(this).css({
						"background-position" : "-32px 0"
					});
				});
			}, function () {
				$(".jump_town").remove();
			});
		},
		transportcalculator : {
			init : function () {
				$('#ui_box .nui_units_box .units_naval').after('<div id="units_transport" class="container_hidden" style="position:relative"><div class="top"></div><div class="bottom"></div><div class="middle"><div class="left"></div><div class="right"></div><div class="content"><div class="units_wrapper clearfix"><div id="tr_wrapper"><div id="tr_options"><div id="tr_recruit" class="checkbox_new checked" style="margin-right:-1px"><div class="tr_options tr_recruit"></div><div class="cbx_icon" style="margin-top:2px"></div></div><div id="tr_outside" class="checkbox_new disabled" style="margin-right:-1px"><div class="tr_options tr_outside tr_deactivated"></div><div class="cbx_icon" style="margin-top:2px"></div></div><div id="tr_big_transporter" class="checkbox_new checked" style="margin-right:-1px"><div class="tr_options tr_big_transporter"></div><div class="cbx_icon" style="margin-top:2px"></div></div><div id="tr_small_transporter" class="checkbox_new checked" style="margin-right:-1px"><div class="tr_options tr_small_transporter"></div><div class="cbx_icon" style="margin-top:2px"></div></div></div><div id="tr_content"></div></div></div><div id= "tr_btn" class="">' + QT.Lang.get("transport_calc", "btn_main") + '</div><div id="tr_btn_top"></div><div class="bottom" style="bottom:19px"></div></div></div></div>');
				$("#tr_btn").css({
					"cursor" : "pointer",
					"position" : "relative",
					"height" : "16px",
					"right" : "5px",
					"font-size" : "10px",
					"font-weight" : "bold",
					"color" : "#EEDDBB",
					"padding-left" : "3px",
					"background" : "url(http://s14.directupload.net/images/140307/2mughecu.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0)"
				});
				$("#tr_btn_top").css({
					"position" : "absolute",
					"height" : "6px",
					"right" : "0px",
					"bottom" : "14px",
					"width" : "138px",
					"background" : "url(http://s14.directupload.net/images/140424/9ol6fg6t.png) no-repeat"
				});
				$("#tr_wrapper").css({
					"padding" : "7px 7px 17px 7px",
					"color" : "#ECB44D",
					"font-size" : "10px",
					"display" : "none",
					"margin-left" : "-6px",
					"background" : "url(http://zz.cdn.grepolis.com/images/game/layout/layout_units_nav_bg.png) repeat scroll 0 0 rgba(0, 0, 0, 0)"
				});
				$(".tr_options").css({
					"background" : "url(http://s14.directupload.net/images/140130/zo8kqb7x.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0)",
					"width" : "15px",
					"height" : "18px",
					"float" : "left"
				});
				$(".tr_outside").css({
					"background-position" : "0 -36px"
				});
				$(".tr_recruit").css({
					"background-position" : "0 -54px"
				});
				$(".tr_deactivated").css({
					"background-image" : "url(http://s7.directupload.net/images/140729/z474f6rk.png)"
				});
				$(".tr_big_transporter").css({
					"background-position" : "0 0"
				});
				$(".tr_small_transporter").css({
					"background-position" : "0 -18px"
				});
				$('#tr_recruit').mousePopup(new MousePopup(QT.Lang.get("transport_calc", "recruits")));
				$('#tr_outside').mousePopup(new MousePopup(QT.Lang.get("transport_calc", "disabled")));
				$('#tr_big_transporter').mousePopup(new MousePopup(QT.Lang.get("transport_calc", "slowtrans")));
				$('#tr_small_transporter').mousePopup(new MousePopup(QT.Lang.get("transport_calc", "fasttrans")));
				$("#tr_options .checkbox_new").click(function () {
					if ($(this).find('DIV.tr_deactivated').length === 0) {
						$(this).toggleClass("checked");
						$("#tr_content").html(QT.Functions.transportcalculator.refresh());
					}
				});
				$("#tr_btn").hover(
					function () {
					$("#tr_btn").css({
						"color" : "#ECB44D"
					});
				},
					function () {
					$("#tr_btn").css({
						"color" : "#EEDDBB"
					});
				});
				$("#tr_btn").click(function () {
					if ($("#tr_wrapper").css('display') == 'none') {
						$("#tr_content").html(QT.Functions.transportcalculator.refresh());
					}
					$("#tr_wrapper").slideToggle();
				});
			},
			refresh : function () {
				var selected_town = ITowns.getTown(Game.townId);
				var GD_units = GameData.units;
				var GD_heroes = GameData.heroes;
				var Transporter_Offset = selected_town.researches().hasBerth() ? GameDataResearches.getBonusBerth() : 0;
				var Ground_Units_BHP = 0;
				var Transport_Capacity = 0;
				var units_outside = 0;
				//var FreePopulation = selected_town.getAvailablePopulation();
				// Units inside town
				var units_own = selected_town.units();
				$.each(units_own, function (unit, number) {
					// Landtruppen
					if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity == undefined) {
						Ground_Units_BHP += number * GD_units[unit].population;
					}
					// Transportschiffe
					else if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity != 0) {
						if ($(".tr_" + unit).parent().hasClass("checked")) {
							Transport_Capacity += number * (GD_units[unit].capacity + Transporter_Offset);
						}
					}
				});
				// recruits
				if ($(".tr_recruit").parent().hasClass("checked")) {
					var recruits = selected_town.getUnitOrdersCollection().models;
					for (var i = 0; i < recruits.length; ++i) {
						var unit = recruits[i].attributes.unit_type;
						var number = recruits[i].attributes.units_left;
						//Landtruppen
						if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity == undefined) {
							Ground_Units_BHP += number * GD_units[unit].population;
						}
						// Transportschiffe
						else if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity != 0) {
							if ($(".tr_" + unit).parent().hasClass("checked")) {
								Transport_Capacity += number * (GD_units[unit].capacity + Transporter_Offset);
							}
						}
					}
				}
				// Units outside town
				if ($(".tr_outside").parent().hasClass("checked")) {
					gpAjax.ajaxPost('units_beyond_info', 'get_supporting_units_for_foreigners', {}, false, function (data) {
						$.each(data.collections[0].data, function (index, object) {
							if (object.home_town_id == Game.townId) {
								$.each(object, function (unit, number) {
									if (!(unit in GD_heroes) && GD_units[unit] && number != 0 && !GD_units[unit].flying && GD_units[unit].capacity == undefined) {
										Ground_Units_BHP += number * GD_units[unit].population;
									} else if (!(unit in GD_heroes) && GD_units[unit] && number != 0 && !GD_units[unit].flying && GD_units[unit].capacity != 0) {
										if ($(".tr_" + unit).parent().hasClass("checked")) {
											Transport_Capacity += number * (GD_units[unit].capacity + Transporter_Offset);
										}
									}
								});
							}
						});
						$("#tr_content").html(createHint(Transport_Capacity, Ground_Units_BHP));
					});
				} else {
					$("#tr_content").html(createHint(Transport_Capacity, Ground_Units_BHP));
				}
				function createHint(Transport_Capacity, Ground_Units_BHP) {
					var textCapacity = '' + QT.Lang.get("transport_calc", "available") + '<br><span style="background: url(http://s14.directupload.net/images/131025/6coe5znl.png) repeat scroll 0 0 rgba(0, 0, 0, 0); color: #EEDDBB; font-family: Verdana; font-size: 11px; font-weight: bold; text-shadow: 1px 1px 0 #000000; width:110px; display:inline-block"><b>' + Transport_Capacity + '</b></span>';
					var textUnits = '' + QT.Lang.get("transport_calc", "transportable") + '<br><span style="background: url(http://s14.directupload.net/images/131025/6coe5znl.png) repeat scroll 0 0 rgba(0, 0, 0, 0); color: #EEDDBB; font-family: Verdana; font-size: 11px; font-weight: bold; text-shadow: 1px 1px 0 #000000; width:110px; display:inline-block""><b>   ' + Ground_Units_BHP + '</b></span>';
					return textCapacity + '<br>' + textUnits;
				}
			}
		},
		unitsBeyondView : function () {
			var selected_town = ITowns.getTown(Game.townId);
			var GD_units = GameData.units;
			var GD_heroes = GameData.heroes;
			var Transporter_Offset = selected_town.researches().hasBerth() ? GameDataResearches.getBonusBerth() : 0;
			var tr_small_cap = GameData.units.small_transporter.capacity + Transporter_Offset;
			var tr_big_cap = GameData.units.big_transporter.capacity + Transporter_Offset;

			function calculate(tr_type_cap, Transport_Capacity, Ground_Units_BHP) {
				var diff = Transport_Capacity - Ground_Units_BHP;
				var tr_empty = Math.floor(diff / tr_type_cap);
				var rest = tr_type_cap - (diff - (tr_empty * tr_type_cap));
				if (rest != tr_type_cap) {
					tr_empty++;
				} else {
					rest = 0;
				}
				return [tr_empty, rest];
			}

			$("#units_beyond_list > LI").each(function (i, e) {
				var Ground_Units_BHP = 0;
				var Transport_Capacity = 0;
				var a = $(this).children("a");
				a.each(function (index) {
					var className = this.className.split(' ');
					var unit = className[className.length - 2];
					var number = $(this).text().trim();
					if (!(unit in GD_heroes) && !GD_units[unit].flying && GD_units[unit].capacity == undefined) {
						Ground_Units_BHP += number * GD_units[unit].population;
					} else if (!(unit in GD_heroes) && !GD_units[unit].flying && GD_units[unit].capacity != 0) {
						Transport_Capacity += number * (GD_units[unit].capacity + Transporter_Offset);
					}
				});

				$(this).find(".place_sendback_container").css({
					"margin-top" : "4px"
				});

				if (Transport_Capacity > 0) {
					var tr_small = calculate(tr_small_cap, Transport_Capacity, Ground_Units_BHP);
					var tr_big = calculate(tr_big_cap, Transport_Capacity, Ground_Units_BHP);
					var tooltip =
						'<div style="position: absolute; margin-left: 40px; margin-top: 5px">' +
						'<div class="qt_sendback_big">' +
						'<div class="qt_sendback_img" style="background-position: 0px 0px; "><span class="qt_sendback_img_span big_naval">' + tr_big[0] + '</span></div>' +
						'<div class="qt_sendback_img" style="background-position: 0px -36px; margin-left: 15px"><span class="qt_sendback_img_span big_land">' + tr_big[1] + '</span></div>' +
						'</div>' +
						'<div class="qt_sendback_small">' +
						'<div class="qt_sendback_img" style="background-position: 0px -18px;"><span class="qt_sendback_img_span small_naval">' + tr_small[0] + '</span></div>' +
						'<div class="qt_sendback_img" style="background-position: 0px -36px; margin-left: 15px"><span class="qt_sendback_img_span small_land">' + tr_small[1] + '</span></div>' +
						'</div></div>';

					if ($(this).find(".qt_sendback_header_span").length == 0) {
						$(this).children("h4").append('<span class="qt_sendback_header_span"> (' + Ground_Units_BHP + '/' + Transport_Capacity + ')</span>')
						$(this).find(".place_sendback_container").append(tooltip);
					} else {
						$(this).find(".qt_sendback_header_span").text(' (' + Ground_Units_BHP + '/' + Transport_Capacity + ')');
						$(this).find(".qt_sendback_big .big_naval").text(tr_big[0]);
						$(this).find(".qt_sendback_big .big_land").text(tr_big[1]);
						$(this).find(".qt_sendback_small .small_naval").text(tr_small[0]);
						$(this).find(".qt_sendback_small .small_land").text(tr_small[1]);
					}
				}
			});
			$(".qt_sendback_img").css({
				"width" : "18px",
				"height" : "16px",
				"background-image" : "url(http://s1.directupload.net/images/140619/vyxakj9l.png)",
				"background-repeat" : "no-repeat",
				"display" : "block",
				"float" : "left"
			});
			$(".qt_sendback_img_span").css({
				"margin-left" : "20px"
			});
			$(".qt_sendback_small").css({
				"float" : "left",
				"margin-top" : "1px"
			});
		},
		unitcomparison : function () {
			window.open(QT.Links.Unitvergleich);
		},
		windowmanager : function () {
			//BB-Codes
			function WndHandlerQTbbcode(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTbbcode, WndHandlerDefault);
			WndHandlerQTbbcode.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 700,
					height : 330,
					minimizable : true,
					title : "BB-Code"
				};
			};
			GPWindowMgr.addWndType("QT_BBCODE", "qtbbcode", WndHandlerQTbbcode, 1);
			//Grepo Stats
			function WndHandlerQTgrepostats(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTgrepostats, WndHandlerDefault);
			WndHandlerQTgrepostats.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 972,
					height : 565,
					minimizable : true,
					title : "Grepo Stats"
				};
			};
			GPWindowMgr.addWndType("QT_GREPOSTATS", "qtgs", WndHandlerQTgrepostats, 1);
			//Grepo Intel
			function WndHandlerQTgrepointel(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTgrepointel, WndHandlerDefault);
			WndHandlerQTgrepointel.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 1013,
					height : 565,
					minimizable : true,
					title : "Grepo Intel"
				};
			};
			GPWindowMgr.addWndType("QT_GREPOINTEL", "qtgi", WndHandlerQTgrepointel, 1);
			//Server Maps
			function WndHandlerQTservermaps(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTservermaps, WndHandlerDefault);
			WndHandlerQTservermaps.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 1038,
					height : 565,
					minimizable : true,
					title : "Server Map"
				};
			};
			GPWindowMgr.addWndType("QT_SERVERMAPS", "qtservermaps", WndHandlerQTservermaps, 1);
			//Townsearches
			function WndHandlerQTtownsearches(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTtownsearches, WndHandlerDefault);
			WndHandlerQTtownsearches.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 972,
					height : 565,
					minimizable : true,
					title : "Townsearch"
				};
			};
			GPWindowMgr.addWndType("QT_TOWNSEARCHES", "qttownsearches", WndHandlerQTtownsearches, 1);
			//Bashlists
			function WndHandlerQTbashlists(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTbashlists, WndHandlerDefault);
			WndHandlerQTbashlists.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 972,
					height : 563,
					minimizable : true,
					title : "Bashlist"
				};
			};
			GPWindowMgr.addWndType("QT_BASHLISTS", "qtbashlists", WndHandlerQTbashlists, 1);
			//Scriptmanager
			function WndHandlerQTscriptmanager(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTscriptmanager, WndHandlerDefault);
			WndHandlerQTscriptmanager.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 750,
					height : 500,
					minimizable : true,
					title : "Scriptmanager"
				};
			};
			GPWindowMgr.addWndType("QT_SCRIPTMANAGER", "qtscriptmanager", WndHandlerQTscriptmanager, 1);
			//Stats&Scripts
			function WndHandlerQTstatsandscripts(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTstatsandscripts, WndHandlerDefault);
			WndHandlerQTstatsandscripts.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 750,
					height : 500,
					minimizable : true,
					title : "Stats & Scripts"
				};
			};
			GPWindowMgr.addWndType("QT_STATSANDSCRIPTS", "qtstatsandscripts", WndHandlerQTstatsandscripts, 1);
			//Google Docs
			function WndHandlerQTgoogledocs(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTgoogledocs, WndHandlerDefault);
			WndHandlerQTgoogledocs.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					width : 852,
					height : 600,
					minimizable : true,
					title : "Google Docs"
				};
			};
			GPWindowMgr.addWndType("QT_GOOGLEDOCS", "qtgoogledocs", WndHandlerQTgoogledocs, 1);
			//Townoverview
			function WndHandlerQTtownoverview(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTtownoverview, WndHandlerDefault);
			WndHandlerQTtownoverview.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					height : 600,
					width : 800,
					minimizable : true,
					title : QT.Lang.get("grepo_mainmenu", "city_view")
				};
			};
			WndHandlerQTtownoverview.prototype.onClose = function () {
				$('#ui_box').append($('DIV.ui_city_overview')).append($('DIV.ui_construction_queue'));
				if ($("#minimap_canvas").hasClass('expanded')) {
					$.Observer(GameEvents.ui.bull_eye.radiobutton.strategic_map.click).publish({});
				} else {
					$.Observer(GameEvents.ui.bull_eye.radiobutton.island_view.click).publish({});
				}
			};
			GPWindowMgr.addWndType("QT_TOWNOVERVIEW", "qttownoverview", WndHandlerQTtownoverview, 1);
			//Rest
			function WndHandlerQTstandard(wndhandle) {
				this.wnd = wndhandle;
			}
			Function.prototype.inherits.call(WndHandlerQTstandard, WndHandlerDefault);
			WndHandlerQTstandard.prototype.getDefaultWindowOptions = function () {
				return {
					position : ["center", "center"],
					height : 500,
					width : 750,
					minimizable : true,
					title : ""
				};
			};
			GPWindowMgr.addWndType("QT_STANDARD", "qtstandard", WndHandlerQTstandard, 1);
		}
	};

	/************************************************************************
	 * Observer
	 ***********************************************************************/
	$.Observer(GameEvents.game.load).subscribe('QT', function (e, data) {
		QT.Settings.setValues();
		QT_sendStats(mID, sID, QT.Settings.values.script_version);
		QT_updater(QT.Lang.get("meta", "changelog"), QT.Lang.get("meta", "forumlink"));
		QT.Functions.mutationobserver();
		QT.Functions.windowmanager();
		QT.Functions.selectunitshelper();
		QT.Functions.qtoolbox();
		if (QT.Settings.values.qmenu_settings_hotkey_active)
			QT.Functions.hotkeys();
		if (QT.Settings.values.qmenu_settings_cityview_BTN)
			QT.Functions.city_view_btn();
		if (QT.Settings.values.qmenu_settings_cityview_window)
			QT.Functions.city_view_window();
		if (QT.Settings.values.qmenu_settings_townbb)
			QT.Functions.bbcodeBtnTown();
		if (QT.Settings.values.qmenu_settings_plusmenu)
			QT.Functions.tb_activitiesExtra();
		if (QT.Settings.values.qmenu_settings_transport_rechner)
			QT.Functions.transportcalculator.init();
		if (QT.Settings.values.qmenu_settings_questliste && $('#quest_overview li').length !== 0)
			QT.Functions.questlist();
		$(document).ajaxComplete(function (event, xhr, settings) {
			var a = settings.url.split("?");
			var b = a[0].substr(6);
			var c = a[1].split("&")[1].substr(7);
			if (b in QT.CallAjaxFunction && c in QT.CallAjaxFunction[b]) {
				QT.CallAjaxFunction[b][c](event, xhr, settings);
			}
		});
	});
}

/************************************************************************
 * Start Method
 ***********************************************************************/
var DATA = {
	script_version : GM_info.script.version
};

var keys = GM_listValues();
for (var i = 0, key = null; key = keys[i]; i++) {
	DATA[key] = GM_getValue(key);
}

unsafeWindow.QT_saveValue = function (name, val) {
	setTimeout(function () {
		GM_setValue(name, val);
	}, 0);
};
unsafeWindow.QT_saveAllValues = function (values) {
	setTimeout(function () {
		var exceptions = ["qmenu_update_next", "qmenu_online_version", "onlinetotal, googledocsurl"];
		var keys = GM_listValues();
		for (var i = 0, key = null; key = keys[i]; i++) {
			if (exceptions.indexOf(key) > -1) {
				continue;
			}
			GM_deleteValue(key);
		}
		for (key in values) {
			GM_setValue(key, values[key]);
		}
		window.location.reload();
	}, 0);
};
unsafeWindow.QT_deleteValue = function (name) {
	setTimeout(function () {
		GM_deleteValue(name);
	}, 0);
};
unsafeWindow.QT_deleteAllValues = function () {
	setTimeout(function () {
		var keys = GM_listValues();
		for (var i = 0, key = null; key = keys[i]; i++) {
			GM_deleteValue(key);
		}
		window.location.reload();
	}, 0);
};
unsafeWindow.QT_sendStats = function (market_id, player_id, script_version) {
	setTimeout(function () {
		GM_xmlhttpRequest({
			method : "POST",
			url : "http://grepolisqt.de/test.php?market_id=" + market_id + "&player_id=" + player_id + "&script_version=" + script_version
		});
	}, 0);
};
unsafeWindow.QT_updater = function (changelog, forumlink) {
	setTimeout(function () {
		var date_now = new Date();
		var date_time = date_now.getTime();
		var version_lastcheck = GM_getValue("qmenu_online_version");
		var version_current = GM_info.script.version;
		var next_update = GM_getValue("qmenu_update_next") || 0;

		function forceCheck() {
			GM_xmlhttpRequest({
				method : "GET",
				url : "https://openuserjs.org/meta/quackmaster/Quack/Quack_Toolsammlung.meta.js",
				headers : {
					"User-agent" : "Mozilla/5.0",
					"Accept" : "text/html"
				},
				onload : function (response) {
					var meta = parseHeaders(response.responseText);
					GM_setValue("qmenu_online_version", meta.version);
					GM_setValue("qmenu_update_next", date_time + (6 * 60 * 60 * 1000));
					if (versionCompare(meta.version, version_current) > 0) {
						showNotice(meta.version);
					}
				}
			});
		}
		function parseHeaders(metadataBlock) {
			var headers = {};
			var metadata = metadataBlock.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
			if (metadata) {
				var lines = metadata[0].match(/@(.*?)(\n|\r)/g);
				for (var i = 0; i < lines.length; i++) {
					var lineData = lines[i].match(/^@([^\s]*?)\s+(.*)/);
					var key = lineData[1];
					var value = lineData[2];
					if (!headers[key])
						headers[key] = value;
					else if (headers[key]instanceof Array)
						headers[key].push(value);
					else
						headers[key] = [headers[key], value];
				}
			}
			return headers;
		}
		function versionCompare(left, right) {
			if (typeof left != "string" || typeof right != "string")
				return false;
			var a = left.split('.');
			var b = right.split('.');
			var len = Math.max(a.length, b.length);
			for (var i = 0; i < len; i++) {
				if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
					return 1;
				} else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
					return -1;
				}
			}
			return 0;
		}
		function showNotice(version) {
			var objTo = document.getElementById('ui_box');
			var divtest = document.createElement("div");
			divtest.innerHTML = '<div id="qt_updatebox" style="position:absolute; bottom:0px; left:50%; margin-left:-214px; width:429px; height:69px; z-index:1000; color:#EEDDBB; background-image:url(http://s7.directupload.net/images/140125/8ke6vfq4.png)">' +
				'<img id="qt_updatebox_frog" src="http://s1.directupload.net/images/140711/eshmcqzu.png" style="position:relative; left:23px; top:4px; float:left"/>' +
				'<div id="qt_updatebox_content" style="position:relative; left:38px; top:9px; float:left"; text-align: left>' +
				'<span id="qt_updatebox_update" style="color:red">Update!</span><br/>' +
				'Quack Toolsammlung Version: ' + version + '<br/>' +
				'<a href="' + changelog + '" target="_blank" class="qt_updatebox_link" style="color:#ECB44D">Changelog</a> | ' +
				'<a href="' + forumlink + '" target="_blank" class="qt_updatebox_link" style="color:#ECB44D">Forum</a> | ' +
				'<a href="http://adf.ly/pcChx" target="_blank" class="qt_updatebox_link" style="color:#ECB44D">Website</a>' +
				'</div>' +
				'<a id="qt_updatebox_close" class="cancel" style="float:right; margin-right:19px; margin-top:2px;" href="#"></a>' +
				'</div>';
			objTo.appendChild(divtest);

			var qt_updatebox = document.getElementById('qt_updatebox_close');
			qt_updatebox.addEventListener('click', function (event) {
				document.getElementById('qt_updatebox').remove();
			});

			/*$("#qt_updatebox a").hover(function () {
			$(this).css({
			"color" : "#804000"
			});
			}, function () {
			$(this).css({
			"color" : "#ECB44D"
			});
			});*/
		}

		if (date_time > next_update) {
			forceCheck();
		} else if (versionCompare(version_lastcheck, version_current) > 0) {
			showNotice(version_lastcheck);
		}
	}, 0);
};

if (typeof exportFunction == 'function') {
	exportFunction(unsafeWindow.QT_saveValue, unsafeWindow, {
		defineAs : "QT_saveValue"
	});
	exportFunction(unsafeWindow.QT_saveAllValues, unsafeWindow, {
		defineAs : "QT_saveAllValues"
	});
	exportFunction(unsafeWindow.QT_deleteValue, unsafeWindow, {
		defineAs : "QT_deleteValue"
	});
	exportFunction(unsafeWindow.QT_deleteAllValues, unsafeWindow, {
		defineAs : "QT_deleteAllValues"
	});
	exportFunction(unsafeWindow.QT_sendStats, unsafeWindow, {
		defineAs : "QT_sendStats"
	});
	exportFunction(unsafeWindow.QT_updater, unsafeWindow, {
		defineAs : "QT_updater"
	});
}

function appendScript() {
	if (unsafeWindow.Game) {
		var QT_script = document.createElement('script');
		QT_script.type = 'text/javascript';
		QT_script.textContent = main_script.toString() + "\n main_script(" + JSON.stringify(DATA) + ");";
		document.body.appendChild(QT_script);
	} else {
		setTimeout(function () {
			appendScript();
		}, 100);
	}
}

appendScript();